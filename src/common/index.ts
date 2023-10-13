import icon from "constants/icon"
import { IPaymentMethod } from "interface"

export const DOMAIN = `https://beautyx.vn`
export const LOCAL_TK = '_WEB_TK'
export const CACHE_TIME = 10000000
export const accept_image = "image/jpeg, image/png, image/gif"
export const accept_video = "video/mp4, video/mov, video/avi, video/wmv"
export const accept_media = "image/jpeg, image/png, image/gif, video/mp4, video/mov, video/avi, video/wmv"
export const PAY_ON = {
  id: 5,
  name_key: 'PAYON (QR Code)',
}
export const PAY_ON_BTX = {
  id: 16,
  name_key: 'PAYON (BeautyX)',
  content: 'Thanh toán qua Payon(Hỗ trợ thẻ ngân hàng, ATM, Visa,...)',
  icon: icon.payon
}
export const MOMO = {
  id: 1,
  name_key: 'MOMO',
  content: 'Thanh toán qua ví MOMO',
  icon: icon.momo,
}
export const OTHER = {
  id: 8,
  name_key: 'OTHER',
  content: 'Chuyển khoản ngân hàng',
  icon: icon.creditCard
}
export const LIST_METHOD = [
  MOMO,
  PAY_ON_BTX,
  // OTHER
] as IPaymentMethod[]