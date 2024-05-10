import { useQueryClient } from "@tanstack/react-query";
import { QR_KEY } from "config";

export function useOrderRefresh() {
  const queryClient = useQueryClient()
  return {
    refreshPaid: () => queryClient.refetchQueries([QR_KEY.ORDER_PAID]),
    refreshAll: () => queryClient.refetchQueries([QR_KEY.ORDER_PAID, QR_KEY.ORDER_ALL]),
  }
}