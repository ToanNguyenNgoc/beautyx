import { useQuery } from "@tanstack/react-query"
import { chatApi } from "api"
import { QR_KEY, STALE_TIME } from "config"

export function useGetTopicDetail(topic_id: string) {
  const query = useQuery({
    queryKey: [QR_KEY.TOPIC, topic_id],
    queryFn: () => chatApi.getTopic(topic_id),
    staleTime: STALE_TIME
  })
  const topic = query.data?.context
  return Object.assign(query, {
    topic
  })
}