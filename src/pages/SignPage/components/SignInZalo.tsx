import { AlertAppSnack, BackButton, XButton } from "components/Layout";
import { social } from "constants/img";
import { FC, useState } from "react";
import style from '../sign-page.module.css'
import { Dialog } from "@mui/material";
import QRCode from "react-qr-code";
import { DEEP_LINK_ZALO_MINI_APP } from "constants/index";
import axios from "axios";
import API_3RD from "api/3rd-api";
import { useQuery } from "@tanstack/react-query";
import authentication from "api/authApi";
import { useDispatch } from "react-redux";
import { fetchAsyncUser } from "redux/profile/userSlice";
import { useHistory } from "react-router-dom";
import BeautyLoading from "components/BeautyxLoading";

export const SignInZalo: FC = () => {
  const [loadAll, setLoadAll] = useState(false)
  const [appCode, setAppCode] = useState<string>()
  const history = useHistory()
  const dispatch = useDispatch()
  const handleLoginZalo = () => {
    const app_code = `beauty.vn_${new Date().getTime()}`
    axios.post(`${API_3RD.API_NODE}/mobile-app`, {
      app_code
    }).then(() => {
      setAppCode(app_code)
    })
  }
  useQuery({
    queryKey: [appCode],
    queryFn: () => axios.get(`${API_3RD.API_NODE}/mobile-app/${appCode}`),
    enabled: !!appCode,
    refetchInterval: 1000,
    onSuccess: async (data) => {
      const access_token = data?.data?.data?.access_token
      const code = data?.data?.data?.code
      if (access_token && code) {
        setAppCode(undefined)
        setLoadAll(true)
        try {
          const response = await authentication.loginZalo({ access_token, code })
          if (response) {
            localStorage.setItem("_WEB_TK", response.data.context.token);
            localStorage.setItem("_WEB_TK_RE", response.data.context.refresh_token);
            localStorage.setItem("_WEB_TK_EX", response.data.context.token_expired_at);
            const res = await dispatch(fetchAsyncUser(response.data.context.token));
            if (res?.payload) {
              history.goBack();
              AlertAppSnack.open({ title: 'Đăng nhập thành công', type: 'success' })
              setLoadAll(false)
            }
          }
        } catch (error) {
          AlertAppSnack.open({ title: 'Có lỗi xảy ra. Vui lòng thử lại', type: 'error' })
          setLoadAll(false)
        }
      }
    }
  })
  return (
    <>
      <XButton
        icon={social.zalo}
        iconSize={42}
        onClick={handleLoginZalo}
      />
      <Dialog fullScreen open={!!appCode} onClose={() => setAppCode(undefined)} >
        <div className={style.zaloCnt}>
          <BackButton onBackFunc={() => setAppCode(undefined)} />
          <p className={style.zaloName}>Zalo</p>
          <p className={style.zaloContent}>
            {'Đăng nhập tài khoản Zalo \n để kết nối với ứng dụng BeautyX'}
          </p>
          <div className={style.zaloQrCnt}>
            <p className={style.zaloQrTitle}>MÃ QR</p>
            <QRCode
              size={256}
              className={style.zaloQr}
              value={`${DEEP_LINK_ZALO_MINI_APP}?app_code=${appCode}&platform=BEAUTYX`}
              // value={`https://zalo.me/s/458502586636539333/dang-nhap-app?env=TESTING&version=62&app_code=${appCode}?platform=BEAUTYX`}
              viewBox={`0 0 256 256`}
            />
            <p className={style.zaloQrGuide}>
              Sử dụng ứng dụng Camera để quét mã QR
            </p>
          </div>
        </div>
      </Dialog>
      {
        loadAll ?
          <div className={style.zaloLoadAll}>
            <BeautyLoading />
          </div>
          :
          null
      }
    </>
  )
}