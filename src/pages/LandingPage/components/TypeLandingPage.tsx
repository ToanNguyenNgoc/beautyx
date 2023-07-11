import { IBanner } from 'interface/banner';
import React from 'react';
import parse from 'html-react-parser'
import style from './style.module.css'
import Skeleton from 'react-loading-skeleton';

export function TypeLandingPage({ banner }: { banner: IBanner }) {
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
                    {banner?.htmlTemplate && parse(banner.htmlTemplate)}
                </div>
            </div>
        </>
    );
}