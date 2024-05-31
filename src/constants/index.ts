import icon from "./icon"

export const mailSales = "sales@myspa.vn";
export const reward_percent_order = 0.02
export const mailSupport = "support@beautyx.vn";
export const phoneSupport = "0343131003";
export const phoneHotline = "0899310908";
export const ABOUT_PARTNER_LINK = 'https://myspa.vn/mo-gian-hang-tren-beautyx'
export const BTX_POINT_RATIO = 100
export const MOMO_METHOD = {
  name_key: "MOMO",
  content: 'Thanh toán qua ví MOMO hoặc app ngân hàng',
  icon: icon.momo,
}
export const PAYON_METHOD = {
  name_key: 'PAYON (BeautyX)',
  content: 'Thanh toán qua Payon(Hỗ trợ thẻ ngân hàng, ATM, Visa,...)',
  icon: icon.payon
}
export const OTHER_METHOD = {
  name_key: 'OTHER',
  content: 'Chuyển khoản ngân hàng',
  icon: icon.creditCard
}
export const LIST_METHOD = [
  MOMO_METHOD,
  PAYON_METHOD,
  OTHER_METHOD
] as Array<{ name_key: string, content: string, icon: string }>

export const hidden_orgs = ['nganthang', 'musa']

export const storage_keys = {
  local_pm_method:'local_pm_method'
}