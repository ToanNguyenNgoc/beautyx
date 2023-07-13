import { axiosClient } from "config"
import { OrganizationApprove, Response, ResponseType, Statistic } from "interface"
import { ParamsOrgApprove } from "params-query/param.interface"

export const statisticApi = {
  statistic: () => axiosClient.get('/statistic').then<Response<Statistic>>(res => res.data),
  orgsApprove: (pr: ParamsOrgApprove) => axiosClient.get('/statistics/approve', { params: pr })
    .then<ResponseType<OrganizationApprove[]>>(res => res.data)
}