import { HomeTitle, XButton } from "components/Layout"
import { FC, useState } from "react"
import style from "./style.module.css"
import Slider, { Settings } from "react-slick"
import { Link } from "react-router-dom"
import { clst, scrollTop, slugify } from "utils"
import icon from "constants/icon"
import { useDeviceMobile, usePromotion } from "hooks"

const Next = (props: any) => {
  return (
    <XButton
      icon={icon.chevronRight}
      onClick={props.onClick}
      className={clst([style.slide_btn, style.slide_btn_next])}
    />
  );
};
const Prev = (props: any) => {
  return (
    <XButton
      icon={icon.chevronLeft}
      onClick={props.onClick}
      className={clst([style.slide_btn, style.slide_btn_prev])}
    />
  );
};

export const HomePromotions: FC = () => {
  const { data } = usePromotion()
  const [title, setTitle] = useState<string>()
  const mb = useDeviceMobile()
  const settings: Settings = {
    dots: false,
    infinite: true,
    arrows: true,
    centerPadding: mb ? "25px" : "250px",
    centerMode: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipe: true,
    draggable: true,
    nextArrow: <Next />,
    prevArrow: <Prev />,
    responsive: [
      {
        breakpoint: 767,
        settings: {
          arrows: false,
        },
      },
    ],
    afterChange: (currentSlide) => setTitle(data && data[currentSlide]?.name),
  }
  return (
    (data && data.length) ?
      <div className={style.container}>
        <HomeTitle title={title || data[0].name} />
        <div className={style.body}>
          <Slider {...settings}>
            {
              data?.map(item => (
                <Link onClick={() => scrollTop('auto')} key={item.id} className={style.deal_cnt} to={{ pathname: `/deal/${slugify(item.name)}` }} >
                  <div className={style.deal}>
                    <div className={style.image_cnt}>
                      <img src={item.is_popup === 1 ? (item.thumbnail_url || '') : (item.thumbnail_url || '')} alt="" className={style.image} />
                    </div>
                  </div>
                </Link>
              ))
            }
          </Slider>
        </div>
      </div>
      :
      <></>
  )
}