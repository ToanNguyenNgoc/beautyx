/* eslint-disable react-hooks/exhaustive-deps */
import { EmptyRes, XButton } from 'components/Layout';
import { useGetOrder } from 'hooks';
import { IOrderV2 } from 'interface/orderv2';
import React, { FC, memo, useContext } from 'react';
import OrderItem from './OrderItem';
import { OrderSkelton } from './TabOrderPaid';
import style from '../order.module.css'
import { AppContext } from 'context';


export const TabOrderCancel: FC = memo(() => {
    const { t } = useContext(AppContext) as any
    const { orders, totalItem, loading, allowNextPage, fetchNextPage, isFetchingNextPage } = useGetOrder({
        'filter[status]': ''
    })
    return (
        <div className={style.order_container} >
            {totalItem === 0 && <EmptyRes title='Bạn chưa có đơn hàng nào' />}
            {loading && <OrderSkelton />}
            <ul>
                {orders.map((order: IOrderV2, index: number) => (
                    <li key={order.id} style={{ margin: '6px 0px' }}>
                        <OrderItem key={index} order={order} />
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