import { axiosClient } from "config"

const viettelAuthApi = {
  login: (params: { fullname?: string, email?: string, telephone?: string }) => {
    return axiosClient.post('/auth/momo', params)
  }
}

export default viettelAuthApi