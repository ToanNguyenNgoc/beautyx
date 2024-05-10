/* eslint-disable react-hooks/exhaustive-deps */
import { UseQueryOptions, useInfiniteQuery } from "@tanstack/react-query";
import { orderApi } from "api/orderApi";
import { QR_KEY } from "config";
import dayjs from "dayjs";
import { IOrderV2, IUser_Items } from "interface";
import IStore from "interface/IStore";
import { omit } from "lodash";
import { paramOrder } from "params-query";
import { ParamOrder } from "params-query/param.interface";
import { useSelector } from "react-redux";

const todayNumber = parseInt(dayjs().format('YYYYMMDD'))
export const checkTimeExpired = (items: IUser_Items[]) => {
  let condition = false
  const services_sold_ex_time = items
    .map(i => i.services_sold)
    .map(i => parseInt(dayjs(i.time_expired).format('YYYYMMDD'))).filter(Boolean)
    .sort((a, b) => b - a)
  const services_sold_ex_time_max = services_sold_ex_time[0]
  if (services_sold_ex_time_max >= todayNumber) {
    condition = true
  }
  return condition
}

export function useGetOrder(param?: ParamOrder, options?: UseQueryOptions<any>) {
  const { USER } = useSelector((state: IStore) => state.USER)
  const qr = omit(Object.assign(paramOrder, param), ['page'])
  const { data, fetchNextPage, isLoading, isFetchingNextPage, refetch } = useInfiniteQuery({
    queryKey: [param?.["filter[status]"] === 'PAID' ? QR_KEY.ORDER_PAID : QR_KEY.ORDER_ALL],
    queryFn: ({ pageParam = 1 }) => orderApi.getOrder(Object.assign(qr, { 'page': pageParam })),
    getNextPageParam: (page: any) => page.current_page + 1,
    enabled: !!USER,
    ...options
  })
  const orders: IOrderV2[] = data?.pages?.map(i => i.data)?.flat() || []
  const totalItem = (data?.pages && data.pages.length > 0) ? data.pages[0].total : 1
  const loading = isLoading && orders.length === 0
  const allowNextPage = (orders.length < totalItem)

  return {
    data,
    loading,
    orders,
    totalItem,
    fetchNextPage,
    allowNextPage,
    isFetchingNextPage,
    refetch
  }
}