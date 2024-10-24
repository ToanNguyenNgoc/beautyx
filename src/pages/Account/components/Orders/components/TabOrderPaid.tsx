/* eslint-disable react-hooks/exhaustive-deps */
import { XButton } from "components/Layout";
import { AppContext } from "context/AppProvider";
import { IOrderV2 } from "interface/orderv2";
import React, { FC, memo, useContext } from "react";
import OrderItem from "./OrderItem";
import { EmptyRes } from "components/Layout";
import Skeleton from "react-loading-skeleton";
import { useGetConfig, useGetOrder } from "hooks";
import style from '../order.module.css'
import { useDispatch } from "react-redux";
import { onSetOrderHasReview } from "redux/order-has-review/OrderHasReviewSlice";

export const TabOrderPaid: FC = memo(() => {
  const {is_agency} = useGetConfig()
  const { t } = useContext(AppContext) as any
  const dispatch = useDispatch()
  const { orders, totalItem, fetchNextPage, loading, allowNextPage, isFetchingNextPage } = useGetOrder({
    "filter[status]": 'PAID',
  }, {
    onSuccess: (data: any) => {
      const dataOrders: IOrderV2[] = data?.pages?.map((i: any) => i.data)?.flat() || []
      dispatch(onSetOrderHasReview(dataOrders?.filter(i => i.is_review === 1).map(i => i.id)))
    }
  })

  return (
    <div className={style.order_container} >
      {totalItem === 0 && <EmptyRes title='Bạn chưa có đơn hàng nào' />}
      {loading && <OrderSkelton />}
      <ul>
        {orders.map((order: IOrderV2, index: number) => (
          <li key={order.id} style={{ margin: '6px 0px' }}>
            <OrderItem is_agency={is_agency} key={index} order={order} />
          </li>
        ))}
      </ul>
      <div className="order-list__bottom">
        {allowNextPage && (
          <XButton
            title={t("trending.watch_all")}
            loading={isFetchingNextPage}
            onClick={() => fetchNextPage()}
          />
        )}
      </div>
    </div>
  );
})

export const OrderSkelton = () => {
  const count = [1, 2, 3, 4, 5, 6]
  return (
    <ul className="order-list__cnt order-load__cnt">
      {
        count.map(item => (
          <li key={item} className="order_load_cnt">
            <div className="order_load_cnt_head">
              <Skeleton width={'100%'} height={'100%'} />
            </div>
            <div className="order_load_cnt_body">
              <Skeleton width={'100%'} height={'100%'} />
            </div>
            <div className="order_load_cnt_bot">
              <Skeleton width={'100%'} height={'100%'} />
            </div>
          </li>
        ))
      }
    </ul>
  )
}
