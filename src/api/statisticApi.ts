import { axiosClient2 } from "config"
import { OrganizationApprove, Response, ResponseType, Statistic } from "interface"
import { ParamsOrgApprove } from "params-query/param.interface"

export const statisticApi = {
  statistic: () => axiosClient2.get('/statistic').then<Response<Statistic>>(res => res.data),
  orgsApprove: (pr: ParamsOrgApprove) => axiosClient2.get('/statistics/approve', { params: pr })
    .then<ResponseType<OrganizationApprove[]>>(res => res.data)
}