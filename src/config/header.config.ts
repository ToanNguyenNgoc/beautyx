import { LOCAL_TK } from "common"
import dayjs from "dayjs"

export const handleValidToken = () => {
  let refresh = false
  const token_ex_at = sessionStorage.getItem('_WEB_TK_EX') ?? localStorage.getItem('_WEB_TK_EX')
  const token_refresh = sessionStorage.getItem('_WEB_TK_RE') ?? localStorage.getItem('_WEB_TK_RE')
  const token = sessionStorage.getItem(LOCAL_TK) ?? localStorage.getItem(LOCAL_TK)
  const expDate = dayjs(token_ex_at).format('YYYYMMDD')
  const expTime = dayjs(token_ex_at).format('HHmmss')
  const expNum = parseInt(`${expDate}${expTime}`)
  const nowNum = parseInt(`${dayjs().format('YYYYMMDDHHmmss')}`)
  if (nowNum >= expNum && token_ex_at && token_refresh && token) {
    refresh = true
  }
  return { refresh, token_refresh, token }
}

export const AUTH_HEADER_WS = () => {
  const session = window.sessionStorage.getItem("_WEB_TK");
  const local = localStorage.getItem("_WEB_TK")
  return {
    headers: {
      "Authorization": (local || session) ? `Bearer ${session ? session : local}`:'',
      "Content-Type": ''
    },
  }
}
export const token = localStorage.getItem("_WEB_TK") ?? window.sessionStorage.getItem("_WEB_TK");
export const AUTH_HEADER = (contentType?: 'application/json' | 'multipart/form-data' | "") => {
  const session = window.sessionStorage.getItem("_WEB_TK");
  const local = localStorage.getItem("_WEB_TK")
  return {
    headers: {
      "Authorization": (local || session) ? `Bearer ${session ? session : local}`:'',
      "Content-Type": contentType ? contentType : 'application/json'
    },
  }
}