import { ITopic } from "interface"
import { useAuth } from "./useAuth"
import { useSwrInfinite } from "./useSwrInfinite"

export function useGetAllTopic() {
  const { USER } = useAuth()
  const { resData, isValidating } = useSwrInfinite({
    API_URL: "topics",
    enable: USER,
    params: Object.assign({ l: 100, sort:'-created_at' }),
    dedupingInterval: 0
  })
  const topics: ITopic[] = resData || [];
  const topic_ids = topics.map(i => i._id);
  return {
    topics,
    topic_ids,
    isValidating
  }
}

export function useGetAllTopicIds() {
  const { USER } = useAuth();
  const { resData, isValidating } = useSwrInfinite({
    API_URL: "topics",
    enable: USER,
    params: Object.assign({ l: 1000, is_only_id:true, user_id: USER?.id, sort:'-created_at' }),
    dedupingInterval: 0
  })
  const topics: ITopic[] = resData || [];
  const topic_ids = topics.map(i => i.id);
  return {
    topic_ids, isValidating
  }
}