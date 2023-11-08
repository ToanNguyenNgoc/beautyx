import { FC } from 'react'
import style from './style.module.css'
import Lottie from "lottie-react";
import animationData from "assets/confeti_happy.json";

interface HomePrettierProps {
  hidden?: boolean
}

export const HomePrettier: FC<HomePrettierProps> = ({ hidden = false }) => {
  return (
    !hidden ?
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
      :
      <></>
  );
}
