import { IBanner } from 'interface/banner';
import React from 'react';
import { useFetch } from 'hooks';
import { ProductableItem } from 'components/Layout'
import style from "./style.module.css"
import Skeleton from 'react-loading-skeleton';
import { Productable } from 'interface';

export function TypeSearchResult({ banner }: { banner: IBanner }) {
    const condition = banner ? true : false
    const url = banner?.url ?? ""
    const { response } = useFetch(condition, url)
    console.log(response)
    return (
        <>
            <div className={style.banner_container}>
                <div className={style.banner_container_load}>
                    <Skeleton width={"100%"} height={"100%"} />
                </div>
                <img className={style.banner_img} src={banner?.imageURL ? banner.imageURL : ""} alt="" />
            </div>
            <div className={style.body}>
                <div className={style.body_container}>
                    <ul className={style.list_item}>
                        {
                            response?.context?.data?.map((item: Productable, index: number) => (
                                <li key={index} className={style.item_container}>
                                    <ProductableItem
                                        productable={item}
                                    />
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </>
    );
}