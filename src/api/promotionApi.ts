import { axiosClient } from "config";
import { ResponseType, Promotion, Response } from "interface"

export const promotionApi = {
  promotions: () => axiosClient.get('/promotions', { params: { 'sort': '-created_at' } })
    .then<ResponseType<Promotion[]>>(res => res.data),
  promotion: (id: number | string) => axiosClient.get(`/promotions/${id}`)
    .then<Response<Promotion>>(res => res.data)
}