import { axiosClient } from "config";
import { identity, pickBy } from "lodash";
import { paramsUserProfile } from "params-query";
import { ParamsForgotSms } from "interface"
import { EXTRA_FLAT_FORM } from "./extraFlatForm";

class Auth {
  login = (values: any) => {
    const url = `/auth/login`;
    const params = {
      ...values,
      "platform": EXTRA_FLAT_FORM()
    }
    return axiosClient.post(url, params);
  };
  loginZalo = (values: { access_token: string, code: string, fullname?:string }) => {
    return axiosClient.post('/auth/zalo', values)
  };
  register = (params: any) => {
    const url = `/auth/register`;
    return axiosClient.post(url, Object.assign({platform:EXTRA_FLAT_FORM()},params));
  };
  getUserProfile = (token?: string) => {
    const url = `/users/profile`
    return axiosClient.get(url, { params: paramsUserProfile }).then().catch(() => axiosClient.get(url))
  };
  forgotPassword = (values: any) => {
    const url = `/auth/forgot`;
    const params = values
    return axiosClient.post(url, params)
  };
  forgotVoiceSms = (params: ParamsForgotSms) => {
    const url = '/auth/forgotvoicesms';
    return axiosClient.post(url, params)
  }
  putUserProfile = (params: any) => {
    const url = `/users/profile`;
    return axiosClient.put(url, pickBy(params, identity))
  };
  refreshToken = (token: string) => {
    const url = '/auth/refresh'
    return axiosClient.post(url, {
      'refresh_token': token,
      'platform': EXTRA_FLAT_FORM()
    })
  };
  loginOtpZms = (params: { telephone: string }) => {
    return axiosClient.post('/auth/login/otp', params)
  }

}
const authentication = new Auth();
export const auth = new Auth()
export default authentication;
