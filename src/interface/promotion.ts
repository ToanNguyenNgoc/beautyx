import { IDiscountPar } from "interface/discount";
import { Media, Productable } from "interface/productable";
import { IOrganization } from "./organization";

export interface Promotion {
  id: number,
  name: string,
  content: string | null,
  media_url: string | null,
  thumbnail_url: string | null,
  media: Media[]
  is_popup: number,
  valid_from: string,
  valid_util: string,
  created_at: string,
  updated_at: string,
  discounts: IDiscountPar[],
  productables: Array<{ id: number, productable: Productable, organization?: IOrganization }>
}