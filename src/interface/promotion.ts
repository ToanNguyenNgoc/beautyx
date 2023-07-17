import { IDiscountPar } from "interface/discount";
import { Productable } from "interface/productable";

export interface Promotion {
  id: number,
  name: string,
  content: string | null,
  imageURL: string,
  thumbnail: string,
  is_popup: 1 | 0,
  valid_from: string,
  valid_util: string,
  created_at: string,
  updated_at: string,
  discounts: IDiscountPar[],
  productables: Productable[]
}