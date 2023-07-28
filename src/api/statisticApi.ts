import { axiosClient, axiosClient2 } from "config"
import { OrganizationApprove, Response, ResponseType, Statistic, User } from "interface"
import { ParamsOrgApprove } from "params-query/param.interface"

export const statisticApi = {
  statistic: () => axiosClient2.get('/statistic').then<Response<Statistic>>(res => res.data),
  orgsApprove: (pr: ParamsOrgApprove) => axiosClient2.get('/statistics/approve', { params: pr })
    .then<ResponseType<OrganizationApprove[]>>(res => res.data),
  customers: () => axiosClient.get('/statistics/customers').then<Response<User[]>>(res => res.data)
}