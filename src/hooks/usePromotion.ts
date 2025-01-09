import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { QR_KEY, STALE_TIME, baseURL } from "config";
import { Promotion, ResponseType } from "interface";

export function usePromotion() {
  const { data: res } = useQuery({
    queryKey: [QR_KEY.PROMOTION],
    queryFn: () => axios.get(`${baseURL}promotions`, {
      params: {
        'sort': '-created_at'
      }
    }).then<ResponseType<Promotion[]>>(res => res.data),
    staleTime: STALE_TIME
  })
  const data = res?.context.data?.filter(i => i.priority >= 0) || []
  return {
    data
  }
}