/* eslint-disable react-hooks/exhaustive-deps */
import { useMutation } from "@tanstack/react-query";
import authentication from "api/authApi";
import { AxiosError } from "axios";
import { Alert } from "components/Layout";
import { storage_keys } from "constants/index";
import { ParamsPostLogin, Response, User } from "interface";
import IStore from "interface/IStore";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAsyncUser } from "redux/profile/userSlice";

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
      const response = await dispatch(fetchAsyncUser(token));
      if (response?.payload && options?.callBackLoginSuccess) {
        options.callBackLoginSuccess()
      }
    },
    onError: (err) => {
      const error = err as AxiosError;
      switch (error?.response?.status) {
        case 401:
          Alert.open({ message: '"Mật khẩu chưa chính xác. Vui lòng thử lại !"' })
          break;

        default:
          Alert.open({ message: `Có lỗi xảy ra (${error.response?.status}).Vui lòng thử lại sau!` })
          break;
      }
    }
  })
  return {
    mutationLogin
  }
}