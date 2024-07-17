import { axiosClient } from "config";
import { pickBy, identity } from 'lodash'
import { ParamOrder } from "params-query/param.interface";

class Order {
    getOrder = (params: ParamOrder) => {
        return axiosClient.get('/orders', { params }).then(res => res.data.context)
    }
    getOrderById = (order_id: number) => {
        const params = {
            'include': 'btxReward',
            'filter[productable]': false
        }
        return axiosClient.get(`/orders/${order_id}`, { params })
    }
    postOrder = (org_id: number, params: object) => {
        const data = JSON.stringify(pickBy(params, identity));
        const url = `/organizations/${org_id}/orders`;
        return axiosClient.post(url, data)
    }
    getPaymentgateways = (transaction_uuid: string, status: boolean) => {
        return axiosClient.get(`/paymentgateways/${transaction_uuid}/status`, {
            params: {
                cancel: status
            }
        })
    }
    onCancelPrevOrder = async () => {
        try {
            const orders = await this.getOrder({
                'page': 1,
                'limit': 3,
                'sort': '-created_at',
                'filter[status]': 'PENDING',
                'filter[platform]': 'BEAUTYX|BEAUTYX MOBILE|ZALO|MOMO|VIETTEL'
            }).then(res => res.data) || []
            for (var i = 0; i < orders.length; i++) {
                const transaction_uuid = orders[i].payment_gateway?.transaction_uuid
                if (transaction_uuid) {
                    await this.getPaymentgateways(transaction_uuid, true)
                }
            }
        } catch (error) { }
        return
    }
}
const order = new Order();
export const orderApi = new Order()
export default order