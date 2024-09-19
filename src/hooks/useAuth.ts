/* eslint-disable react-hooks/exhaustive-deps */
import { useMutation } from "@tanstack/react-query";
import authentication from "api/authApi";
import { AxiosError } from "axios";
import { Alert, AlertAppSnack } from "components/Layout";
import { storage_keys } from "constants/index";
import { AppContext, AppContextType } from "context";
import { ParamsPostForgot, ParamsPostLogin, ParamsPostRegister, ParamsPostZnsZaloOtp, Response, User } from "interface";
import IStore from "interface/IStore";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { fetchAsyncUser } from "redux/profile/userSlice";
import { path } from "route/path";

interface Options {
  refresh_enable?: boolean
}

export function useAuth(options?: Options) {
  const dispatch = useDispatch()
  const [firstLoad, setFirstLoad] = useState(true)
  const { USER } = useSelector((state: IStore) => state.USER)
  const getUser = async () => {
    if (!USER) {
      await dispatch(fetchAsyncUser())
      setFirstLoad(false)
    }
  }
  useEffect(() => {
    if (options?.refresh_enable) {
      dispatch(fetchAsyncUser())
    } else {
      getUser()
    }
  }, [])
  return { firstLoad, USER }
}

interface UseDoAuthOptions {
  remember?: boolean;
  callBackLoginSuccess?: () => void
}

export function useDoAuth(options?: UseDoAuthOptions) {
  const history = useHistory()
  const { t } = useContext(AppContext) as AppContextType
  const dispatch = useDispatch()
  const mutationLogin = useMutation<Response<User>, unknown, ParamsPostLogin>({
    mutationFn: body => authentication.login(body).then(res => res.data),
    onSuccess: async (data) => {
      const { token, refresh_token, token_expired_at } = data.context
      if (options?.remember) {
        localStorage.setItem(storage_keys._WEB_TK, token)
        localStorage.setItem(storage_keys._WEB_TK_EX, token_expired_at)
        localStorage.setItem(storage_keys._WEB_TK_RE, refresh_token)
      } else {
        sessionStorage.setItem(storage_keys._WEB_TK, token)
        sessionStorage.setItem(storage_keys._WEB_TK_EX, token_expired_at)
        sessionStorage.setItem(storage_keys._WEB_TK_RE, refresh_token)
      }
      await dispatch(fetchAsyncUser(token));
      if (options?.callBackLoginSuccess) {
        options.callBackLoginSuccess()
      }
    },
    onError: (err) => {
      const error = err as AxiosError;
      switch (error?.response?.status) {
        case 401:
          Alert.open({ message: 'Mật khẩu chưa chính xác. Vui lòng thử lại !' })
          break;
        case 404:
          Alert.open({
            message: `Emai ${t("form.is_not_registered")}`,
            actions: [
              { text: `${t("Home.Sign_up")} ${t("form.now")}`, onPress: () => history.push(path.auth('register')) }
            ]
          })
          break;
        default:
          Alert.open({ message: `Có lỗi xảy ra (${error.response?.status}).Vui lòng thử lại sau!` })
          break;
      }
    }
  })
  const mutationZnsZaloOtp = useMutation<any, any, ParamsPostZnsZaloOtp>({
    mutationFn: body => authentication.loginOtpZms(body),
    onSuccess: () => {
      AlertAppSnack.open({ title: 'Tin nhắn OTP đã được gửi đến Zalo của bạn' })
    },
    onError: () => {
      AlertAppSnack.open({ title: 'Có lỗi xảy ra. Vui lòng thử lại', type: 'error' })
    }
  })
  const mutationForgot = useMutation<any, any, ParamsPostForgot>({
    mutationFn: body => authentication.forgotPassword(body).then(res => res.data),
    onSuccess: (data, variables) => {
      Alert.open({
        message: t("form.change_password_successfully"),
        actions: variables.type === 'CHANGE' ? [] : [
          {
            text: t('form.back_to_sign_in_page'),
            onPress: () => history.replace(path.auth('login'))
          }
        ]
      })
    },
    onError: (err) => {
      const error = err as AxiosError<any>
      switch (error?.response?.status) {
        case 403:
          Alert.open({ message: 'Mã xác thực không đúng !' })
          break;
        default:
          Alert.open({ message: `Có lỗi xảy ra (${error.response?.status}).Vui lòng thử lại sau!` })
          break;
      }
    }
  })
  const mutationRegister = useMutation<any, any, ParamsPostRegister>({
    mutationFn: body => authentication.register(body).then(res => res.data),
    onSuccess: (data) => {
      Alert.open({
        message: t('form.register_success'),
        actions: [
          {
            text: t('form.back_to_sign_in_page'),
            onPress: () => history.replace(path.auth('login'))
          }
        ]
      })
    },
    onError: (err, variables) => {
      const error = err as AxiosError<any>
      switch (error?.response?.status) {
        case 403:
          Alert.open({ message: 'Mã xác thực không đúng !' })
          break;
        case 400:
          mutationForgot.mutate({
            telephone: variables.telephone,
            code: variables.code,
            new_password: variables.password,
            verification_id: variables.verification_id
          })
          break;
        default:
          Alert.open({ message: `Có lỗi xảy ra (${error.response?.status}).Vui lòng thử lại sau!` })
          break;
      }
    }
  })
  return {
    mutationLogin,
    mutationZnsZaloOtp,
    mutationRegister,
    mutationForgot
  }
}