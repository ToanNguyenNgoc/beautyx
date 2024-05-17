import icon from "constants/icon";
import React, { FC } from "react";
import style from './rate-star.module.css'

const rateStars = [
  { id: 1, icon: icon.startBold, iconActive: icon.starLine, title: "Rất tệ" },
  { id: 2, icon: icon.startBold, iconActive: icon.starLine, title: "Tệ" },
  { id: 3, icon: icon.startBold, iconActive: icon.starLine, title: "Bình thường" },
  { id: 4, icon: icon.startBold, iconActive: icon.starLine, title: "Tốt" },
  { id: 5, icon: icon.startBold, iconActive: icon.starLine, title: "Rất tốt" },
];

interface RateStarProps {
  value?: number;
  onRateStar?: (value: number) => void
}

export const RateStar: FC<RateStarProps> = (props) => {
  const { value = 5, onRateStar = () => { } } = props;
  return (
    <div>
      <ul className={style.rate_star_list}>
        {
          rateStars.map(i => (
            <li
              onClick={() => onRateStar(i.id)}
              key={i.id} className={style.star_item}
            >
              <img
                src={i.id <= value ? i.icon : i.iconActive}
                className={style.star_icon} alt=""
              />
              <p className={style.star_item_label}>{i.title}</p>
            </li>
          ))
        }
      </ul>
    </div>
  )
}