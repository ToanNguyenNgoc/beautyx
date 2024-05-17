import { axiosClient } from "config";
import { ITip, ResponseType, Response  } from "interface";

class Tip {
    getAll = () => {
        const url = `/beautyxtips`
        const params = {
            "page": 1,
            "limit": 15
        }
        return axiosClient.get(url, { params }).then<ResponseType<ITip[]>>(res => res.data)
    }
    getById = (id: number) => {
        const url = `/beautyxtips/${id}`
        return axiosClient.get(url).then<Response<ITip>>(res => res.data)
    };
}

const tipsApi = new Tip();
export default tipsApi