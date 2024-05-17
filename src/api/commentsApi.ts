import { axiosClient } from "config";
import { BodyComment, IComment, Response, ResponseType } from "interface";
import { identity, pickBy } from "lodash";
import { ParamComment } from "params-query/param.interface";

class Comments {
    finAll = (qr: ParamComment) => {
        return axiosClient.get('/comments', {
            params: pickBy({
                ...qr,
                "include": "rate|children|children.media",
                "append": "media_url",
                "sort": "-created_at"
            }, identity)
        }).then<ResponseType<IComment[]>>(res => res.data)
    }
    create = (body: BodyComment) => {
        return axiosClient.post('/comments', pickBy(body, identity)).then<Response<IComment>>(res => res.data)
    }
    postCommentOrder = (body:any)=> axiosClient.post('/comments/order', body).then(res => res.data)
}
export const commentsApi = new Comments();
export default commentsApi;


