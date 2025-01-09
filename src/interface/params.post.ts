export interface ParamsPostLogin {
  email: string;
  password: string;
}
export interface ParamsPostZnsZaloOtp {
  telephone: string;
  recaptcha?: string
}
export interface ParamsPostRegister {
  fullname: string,
  email: string,
  telephone: string,
  password: string,
  platform?: string,
  code: string,
  verification_id: string
}
export interface ParamsPostForgot {
  telephone: string,
  new_password: string,
  code: string,
  verification_id: string,
  type?: 'CHANGE' | 'FORGOT'
}
export interface ParamsForgotSms {
  telephone: string;
  code?: string;
  new_password?: string
}
export interface ParamsPostMessage {
  msg: string;
  topic_id: string;
  reply_id?: string;
  media_ids?: number[] | string[];
}