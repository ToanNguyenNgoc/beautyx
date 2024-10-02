import React from "react";
import style from "./style.module.css";
import img from "constants/img";
import Slider, { Settings } from "react-slick";

export const AboutSlider: React.FC = () => {
    return (
        <div className={style.slider}>
            <div className={style.slider_list}>
                <div className={style.slider_item}>
                    <img src={img.khothi} alt="khothi" />
                </div>
                <div className={style.slider_item}>
                    <img src={img.lux} alt="lux" />
                </div>
                <div className={style.slider_item}>
                    <img src={img.imperial} alt="imperial" />
                </div>
                <div className={style.slider_item}>
                    <img src={img.medic} alt="medic" />
                </div>
                <div className={style.slider_item}>
                    <img src={img.thanhmai} alt="thanhmai" />
                </div>
                <div className={style.slider_item}>
                    <img src={img.khothi} alt="khothi" />
                </div>
                <div className={style.slider_item}>
                    <img src={img.lux} alt="lux" />
                </div>
                <div className={style.slider_item}>
                    <img src={img.aura} alt="aura" />
                </div>
                <div className={style.slider_item}>
                    <img src={img.imperial} alt="imperial" />
                </div>
                <div className={style.slider_item}>
                    <img src={img.medic} alt="medic" />
                </div>
                <div className={style.slider_item}>
                    <img src={img.thanhmai} alt="thanhmai" />
                </div>
                <div className={style.slider_item}>
                    <img src={img.khothi} alt="khothi" />
                </div>
                <div className={style.slider_item}>
                    <img src={img.lux} alt="lux" />
                </div>
                <div className={style.slider_item}>
                    <img src={img.aura} alt="aura" />
                </div>
                <div className={style.slider_item}>
                    <img src={img.imperial} alt="imperial" />
                </div>
                <div className={style.slider_item}>
                    <img src={img.medic} alt="medic" />
                </div>
                <div className={style.slider_item}>
                    <img src={img.thanhmai} alt="thanhmai" />
                </div>
            </div>
        </div>
    );
};
