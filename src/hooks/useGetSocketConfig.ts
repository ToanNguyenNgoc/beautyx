import { useSwr } from "./useSwr";

interface ResSocketConfig {
  id: number,
  ws_host: string,
  ws_port: number,
  cluster: string,
  enable_stats: boolean,
  force_tls: boolean,
  status: boolean,
  deleted_at: null | string,
  created_at: string,
  updated_at: string
}

export function useGetSocketConfig() {
  const { response, isValidating } = useSwr({
    API_URL: 'socket_configs_client',
    enable: true,
    dedupingInterval: 0
  });
  const config = response as ResSocketConfig|undefined;
  return {
    config,
    isValidating
  }
}