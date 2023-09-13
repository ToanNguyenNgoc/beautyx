import { IOrganization, ITag, User, Service } from "interface";

export interface ReqPost {
  content: string;
  organization_id?: number;
  media_ids: number[];
  status?: number;
  tag_id?: number;
  service_ids?: number[]
}

export interface IPost {
  id: number,
  content: string,
  status: number,
  organization_id: number,
  tag_id: number,
  user_id: number,
  created_at: string,
  updated_at: string,
  is_favorite: boolean,
  list_service: Service[],
  media_url: string[],
  media_url_sizes?: Array<{
    original_url: string;
    width: number;
    height: number
  }>
  tag?: ITag,
  user: User,
  organization?: IOrganization,
  media: any[],
  favorite_count: number,
  comment_count: number
}