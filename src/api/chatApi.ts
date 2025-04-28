import { axiosClient } from "config";
import { ITopic, ParamsPostMessage, ReqTopic, Response } from "interface";

export const chatApi = {
  getTopic:(topic_id:string) => axiosClient.get(`/topics/${topic_id}`).then<Response<ITopic>>(res => res.data) ,
  createTopic: (data: ReqTopic) => {
    return axiosClient.post('topics', data).then<Response<ITopic>>(res => res.data)
  },
  postMessage: (data: ParamsPostMessage) => {
    return axiosClient.post('/messages', data)
  }
}