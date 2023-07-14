import { HomeTitle, XButton } from "components/Layout"
import { AppContext, AppContextType } from "context"
import { useContext } from "react"
import style from "./style.module.css"
import { useGetPromotionQuery } from "redux-toolkit-query/hook-home"
import Slider, { Settings } from "react-slick"
import { Link } from "react-router-dom"
import { clst, slugify } from "utils"
import icon from "constants/icon"
import { useDeviceMobile } from "hooks"

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

function HomeDeal() {
  const { t } = useContext(AppContext) as AppContextType
  const { data } = useGetPromotionQuery()
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
  }
  return (
    <div className={style.container}>
      <HomeTitle title={t('Home.Vietnamese_women_totally_beautiful')} />
      <div className={style.body}>
        <Slider {...settings}>
          {
            data?.map(item => (
              <Link key={item.id} className={style.deal_cnt} to={{ pathname: `/deal/${slugify(item.name)}` }} >
                <div className={style.deal}>
                  <div className={style.image_cnt}>
                    <img src={item.is_popup === 1 ? item.thumbnail : item.imageURL} alt="" className={style.image} />
                  </div>
                </div>
              </Link>
            ))
          }
        </Slider>
      </div>
    </div>
  )
}
export default HomeDeal