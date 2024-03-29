/* eslint-disable react-hooks/exhaustive-deps */
import { AUTH_LOCATION } from "api/authLocation"
import API_ROUTE from "api/_api"
import { useCartReducer, useGetParamUrl, useSwr } from "hooks"
import { useEffect } from "react"
import { useHistory } from "react-router-dom"
import { IDiscountPar } from "interface"

interface DiscountLimitCart {
  discount?: IDiscountPar, cart_id: string
}

const routeType = [
  {
    path: 'service', type: 'SERVICE', api: 'services', params: {
      'include': 'category|favorites_count',
      'append': 'is_favorite|rating|bought_count'
    }
  },
  {
    path: 'product', type: 'PRODUCT', api: 'products', params: {
      'append': 'is_favorite|rating',
      'include': 'category|favorites_count'
    }
  },
]

export function useDiscountDetail() {
  const history = useHistory()
  const paramsUrl = useGetParamUrl()
  const paramsArr = paramsUrl?.slice(paramsUrl?.indexOf('service'), paramsUrl?.indexOf('service') + 4)
  const typeItemProps = routeType.find(i => i.path === paramsArr[0])
  const params = {
    id: paramsArr[2],
    org_id: paramsArr[1],
    item_id: paramsArr[3]
  }
  let redirectPageError = false
  if (!typeItemProps) redirectPageError = true
  useEffect(() => {
    if (redirectPageError) history.replace('/error')
  }, [])
  const discount = useDiscount(params)
  const detail = useItem(params, typeItemProps)
  const org = useOrg(params)

  return { discount, org, detail, typeItemProps }
}
const useDiscount = (params: any) => {
  const history = useHistory()
  const { response, error } = useSwr({
    API_URL: `${API_ROUTE.DISCOUNTS_ID(params.id)}`,
    enable: params.id,
    params: { 'append': 'user_available_purchase_count' },
    dedupingInterval: 0
  })
  useEffect(() => {
    if (error) history.replace('/error')
  }, [error])
  return response
}
const useItem = (params: any, typeItemProps: any) => {
  const history = useHistory()
  const { response, error } = useSwr({
    API_URL: `/organizations/${params.org_id}/${typeItemProps?.api}/${params.item_id}`,
    enable: (params.org_id && params.item_id && typeItemProps),
    params: typeItemProps?.params
  })
  useEffect(() => {
    if (error) history.replace('/error')
  }, [error])
  return response
}
const useOrg = (params: any) => {
  const history = useHistory()
  const LOCATION = AUTH_LOCATION()
  const { response, error } = useSwr({
    API_URL: `${API_ROUTE.ORG(params.org_id)}`,
    enable: params.org_id,
    params: { 'filter[location]': LOCATION }
  })
  useEffect(() => {
    if (error) history.replace('/error')
  }, [error])
  return response
}
export function useDiscountLimitCart({ discount, cart_id }: DiscountLimitCart) {
  let enable = true
  const inCart = useCartReducer().cartList.find(i => i.cart_id === cart_id)
  if (inCart && discount?.limit && inCart.quantity >= discount.limit) enable = false
  return {
    enable
  }
}