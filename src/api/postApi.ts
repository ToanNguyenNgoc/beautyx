import API_ROUTE from "api/_api";
import { axiosClient } from "config";
import { IPost, ResponseType, Response, ReqPost } from "interface";
import { ParamsPost } from "params-query/param.interface";
import { fetchImageSizes } from "utils";


export const postApi = {
  posts: async (pr: ParamsPost) => {
    const data: ResponseType<IPost[]> = (await axiosClient.get('post', { params: pr })).data
    data.context.data = await Promise.all(data.context.data.map(async (i) => ({
      ...i,
      media_url_sizes: await fetchImageSizes(i.media_url)
    })))
    return data
  },
  post: async (id: number | string) => {
    const response = await axiosClient.get(`/post/${id}`, { params: { 'append': 'media_url' } })
    const data: Response<IPost> = response.data
    data.context.media_url_sizes = await fetchImageSizes(data.context.media_url)
    return data
  },
  createPost: (body: ReqPost) => {
    return axiosClient.post(API_ROUTE.POSTS, body).then<Response<IPost>>(res => res.data)
  }
}