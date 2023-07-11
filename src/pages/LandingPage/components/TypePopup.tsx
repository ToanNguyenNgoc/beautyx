import { IBanner } from "interface";
import { FC } from "react";
import style from './style.module.css'
import Skeleton from "react-loading-skeleton";
import queryString from "query-string"
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { STALE_TIME } from "config";
import { DiscountList } from "pages/Discounts";

interface TypePopupProps {
  banner: IBanner
}

export const TypePopup: FC<TypePopupProps> = ({ banner }) => {
  const params = queryString.parse(banner.url ?? '') as any
  console.log(params)
  const { data } = useInfiniteQuery({
    queryKey: ['LANDING_POPUP', banner.url],
    queryFn: ({ pageParam = 1 }) => axios.get(params.api, {
      params: {
        page: pageParam,
        ...params
      }
    }).then(res => res.data.context),
    enabled: params.api ? true : false,
    staleTime: STALE_TIME
  })
  const discounts = data?.pages?.map(i => i.data).flat().filter(i => i.platform === "BEAUTYX") || []
  return (
    <>
      <div className={style.banner_container}>
        <div className={style.banner_container_load}>
          <Skeleton width={"100%"} height={"100%"} />
        </div>
        <img className={style.banner_img} src={params.thumbnail} alt="" />
      </div>
      <div className={style.body}>
        <DiscountList
          discounts={discounts}
          totalItem={discounts.length}
        />
      </div>
    </>
  )
}