import React from 'react'
import style from './style.module.css'
import Lottie from "lottie-react";
import animationData from "assets/confeti_happy.json";

export default function HomeFettier() {
  return (
    <div className={style.home_fettier}>
      <div className={style.home_fettier_left}>
        <Lottie
          className={style.customer_lootie}
          width={150}
          height={100}
          animationData={animationData}
          loop={true}
        />
      </div>
      <div className={style.home_fettier_right}>
        <Lottie
          className={style.customer_lootie}
          width={150}
          height={100}
          animationData={animationData}
          loop={true}
        />
      </div>
    </div>
  );
}
