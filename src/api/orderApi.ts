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
}
const order = new Order();
export const orderApi = new Order()
export default order