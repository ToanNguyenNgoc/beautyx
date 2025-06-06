import { QueryClient } from "@tanstack/react-query";
import * as Sentry from "@sentry/react"
import { AxiosError } from "axios";
import queryString from "query-string"

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      cacheTime: 3600 * 10 * 60,
      onError(err) {
        const error = err as AxiosError
        Sentry.captureException(`${error.config?.url}?${queryString.stringify(error.config?.params)}`, {
          level: 'error'
        })
      },
    }
  }
})
export const STALE_TIME = 60 * 60 * (60 * 1000)

export const QR_KEY = {
  POSTS: 'POSTS',
  APPROVE: 'APPROVE',
  PROMOTION: 'PROMOTION',
  TREND_DETAIL: 'TREND_DETAIL',
  TREND_DETAIL_CMT: 'TREND_DETAIL_CMT',
  STAFFS: 'STAFFS',
  PROVINCES: 'PROVINCES',
  ORDER_ALL: 'ORDER_ALL',
  ORDER_PAID: 'ORDER_PAID',
  ORDER_COUNT: 'ORDER_COUNT',
  TIP: 'TIP',
  TOPIC:'TOPIC'
}