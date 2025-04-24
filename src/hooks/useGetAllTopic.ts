import { ITopic } from "interface"
import { useAuth } from "./useAuth"
import { useSwrInfinite } from "./useSwrInfinite"

export function useGetAllTopic() {
  const { USER } = useAuth()
  const { resData, isValidating } = useSwrInfinite({
    API_URL: "topics",
    enable: USER,
    params: Object.assign({ l: 100 }),
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