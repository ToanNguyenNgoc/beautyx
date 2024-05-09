/* eslint-disable react-hooks/exhaustive-deps */
import { useQuery } from "@tanstack/react-query";
import { orderApi } from "api/orderApi";
import { QR_KEY } from "config";
import { paramOrder } from "params-query";
import { checkTimeExpired } from "./useGetOrder";
import { useMemo } from "react";
import IStore from "interface/IStore";
import { useSelector } from "react-redux";

export function useGetOrderCount() {
  const { USER } = useSelector((state: IStore) => state.USER)
  const result = useQuery({
    queryKey: [QR_KEY.ORDER_COUNT],
    queryFn: () => orderApi.getOrder(Object.assign(paramOrder, {
      'filter[status]': 'PAID',
      'limit': 15
    })),
    enabled: !!USER,
  })
  const orders = result.data?.data || []
  //**Count order is not appointment */
  const { order_app, order_not_review } = useMemo(() => {
    const app = orders?.filter(
      (a: any) => (a?.appointments?.length === 0 && checkTimeExpired(a?.items))
    );
    const not_review = orders?.filter(
      (a: any) => (a?.is_review === 0)
    );
    return {
      order_app: app,
      order_not_review: not_review
    }
  }, [orders])

  return Object.assign(result, { orders, order_app, order_not_review })
}