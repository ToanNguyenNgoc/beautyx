import { useQuery } from "@tanstack/react-query"
import API_3RD from "api/3rd-api"
import { EXTRA_FLAT_FORM } from "api/extraFlatForm"
import axios from "axios"
import { AlertAppSnack } from "components/Layout"
import { STALE_TIME } from "config"
import { PLF_TYPE } from "constants/plat-form"

export function useGetConfig() {
  const platform = EXTRA_FLAT_FORM()
  const query = useQuery({
    queryKey: ['useGetConfig'],
    queryFn: () => axios.get(`${API_3RD.API_NODE}/brand-app/beautyx`).then(res => res.data.data),
    staleTime: STALE_TIME,
    onSuccess: (data) => {
      if (platform === PLF_TYPE.BEAUTYX && data.is_agency) {
        AlertAppSnack.open({
          title: "Ứng dụng đang ở chế độ thử nghiệm, đang thực hiện đăng ký với Bộ Công Thương",
          type: "warning",
        })
      }
    }
  })

  return Object.assign(query, {
    is_agency: !!(platform === PLF_TYPE.BEAUTYX && query.data?.is_agency)
  })
}