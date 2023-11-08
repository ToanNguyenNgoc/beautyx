import { Avatar } from '@mui/material';
import Lottie from 'lottie-react';
import { useQuery } from '@tanstack/react-query';
import { statisticApi } from 'api';
import Slider from 'react-slick';
import style from "./style.module.css";
import animationData from "assets/confetti2.json";
import { useContext, useState } from 'react';
import { AppContext } from 'context';
import { STALE_TIME } from 'config';

export function HomeStatisticsCustomer() {
  const { t } = useContext(AppContext) as any;
  const { data } = useQuery({
    queryKey: ['customer'],
    queryFn: () => statisticApi.customers(),
    staleTime:STALE_TIME
  })

  const [playAnimation, setPlayAnimation] = useState(false);

  const onRefTimer = async () => {
    setPlayAnimation(true)
    setTimeout(() => {
      setPlayAnimation(false);
    }, 2900);
  }

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    vertical: true,
    verticalSwiping: true,
    autoplay: true,
    speed: 500,
    swipe: false,
    pauseOnHover: false,
    autoplaySpeed: 3000,
    // afterChange: onRefTimer
  };

  return (
    <>
      <div className={style.customer_wraper}>
        {playAnimation && (
          <Lottie
            className={style.customer_lootie}
            width={350}
            height={100}
            animationData={animationData}
            loop={false}
          />
        )}
        <Slider {...settings}>
          {data?.context?.map((item, i) => (
            <div key={i}>
              <div className={style.customer}>
                {item?.avatar ? (
                  <Avatar src={item?.avatar} sx={{ width: 24, height: 24 }} />
                ) : (
                  <div style={{ height: "24px", width: "0.1px" }}></div>
                )}

                <p className={style.customer_name}>{t("Home.congratulations")} {item.fullname} {t("Home.new_member")}

                </p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
}
