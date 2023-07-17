import { axiosClient2 } from "config";
import { ResponseType, Promotion, Response } from "interface"

export const promotionApi = {
  promotions: () => axiosClient2.get('/promotions', { params: { 'sort': '-created_at' } })
    .then<ResponseType<Promotion[]>>(res => res.data),
  promotion: (id: number | string) => axiosClient2.get(`/promotions/${id}`)
    .then<Response<Promotion>>(res => res.data)
}