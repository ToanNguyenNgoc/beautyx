import axiosClient from './axios';

class Order {
      getOrder = (page: number) => {
            const session = window.sessionStorage.getItem("_WEB_TK");
            const local = localStorage.getItem("_WEB_TK")
            const url = `orders?sort=-id&page=${page}&limit=4`;
            return axiosClient.get(url, {
                  headers: {
                        Authorization: `Bearer ${session ? session : local}`,
                  },
            })
      }
      postOrder = (org_id: number, params: object) => {
            const session = window.sessionStorage.getItem("_WEB_TK");
            const local = localStorage.getItem("_WEB_TK")
            const data = JSON.stringify(params);
            const url = `/organizations/${org_id}/orders`;
            return axiosClient.post(url, data, {
                  headers: {
                        Authorization: `Bearer ${session ? session : local}`,
                  },
            })
      }
}
const order = new Order();
export default order