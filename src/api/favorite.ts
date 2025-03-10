import { axiosClient } from "config";
import { pickBy, identity } from 'lodash';

interface IPostFavoriteItem {
    org_id: number,
    product_id?: any,
    service_id?: any,
    post_id?: any
}

class Favorite {
    postFavorite = (org_id: number) => {
        const params = {
            organization_id: org_id,
        };
        const url = `/favorites`;
        return axiosClient.post(url, params);
    };
    deleteFavorite = (org_id: number) => {
        const url = `/favorites`;
        const values = {
            organization_id: org_id,
        };
        return axiosClient.delete(url, { data: values });
    };
    postFavoriteItem = (values: IPostFavoriteItem) => {
        const url = `/favorites`;
        const paramOb = {
            organization_id: values.org_id,
            product_id: values.product_id,
            service_id: values.service_id,
            post_id: values.post_id,
        }
        const params = pickBy(paramOb, identity)
        return axiosClient.post(url, params)
    };
    deleteFavoriteItem = (values: IPostFavoriteItem) => {
        const url = `/favorites`;
        const paramOb = {
            organization_id: values.org_id,
            product_id: values.product_id,
            service_id: values.service_id,
            post_id: values.post_id,
        }
        const params = pickBy(paramOb, identity)
        return axiosClient.delete(url, { data: params })
    }
}
const favorites = new Favorite();
export default favorites;
