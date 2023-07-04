import API_ROUTE from "api/_api";
import { axiosClient } from "config";
import { identity, pickBy } from "lodash";
import { ParamDiscounts } from "params-query/param.interface";


class Discounts {
    getAll = (params?: ParamDiscounts) => {
        return axiosClient.get(API_ROUTE.DISCOUNTS, { params: pickBy(params, identity) })
    }
    getById = (values: any) => {
        const url = `/discounts/${values.id}`
        const params = {
            "filter[organization_id]": values.org_id,
            "append": "user_available_purchase_count"
        }
        return axiosClient.get(url, { params: pickBy(params, identity) })
    }
}
const discountApi = new Discounts();
export default discountApi;