import API_ROUTE from "api/_api";
import { axiosClient } from "config";
import { IPost, ResponseType, Response, ReqPost } from "interface";
import { ParamsPost } from "params-query/param.interface";

export const postApi = {
  posts: (pr: ParamsPost) => {
    return axiosClient.get('post', { params: pr }).then<ResponseType<IPost[]>>(res => res.data)
  },
  post: (id: number | string) => {
    return axiosClient.get(`/post/${id}`, { params: { 'append': 'media_url' } }).then<Response<IPost>>(res => res.data)
  },
  createPost: (body: ReqPost) => {
    return axiosClient.post(API_ROUTE.POSTS, body).then<Response<IPost>>(res => res.data)
  }
}