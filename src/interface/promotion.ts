import { IDiscountPar } from "interface/discount";
import { Media, Productable } from "interface/productable";

export interface Promotion {
  id: number,
  name: string,
  content: string | null,
  media_url: string | null,
  thumbnail_url: string | null,
  media: Media[]
  is_popup: 1 | 0,
  valid_from: string,
  valid_util: string,
  created_at: string,
  updated_at: string,
  discounts: IDiscountPar[],
  productables: Array<{id:number, productable: Productable }>
}