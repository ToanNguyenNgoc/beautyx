import { Avatar } from '@mui/material';
import Lottie from 'lottie-react';
import { useQuery } from '@tanstack/react-query';
import { statisticApi } from 'api';
import Slider from 'react-slick';
import style from "./style.module.css";
import animationData from "assets/confetti2.json";
import { useState } from 'react';

export default function HomeStatisticsCustomer() {
  const { data } = useQuery({
    queryKey: ['customer'],
    queryFn: () => statisticApi.customers()
  })

  const [playAnimation, setPlayAnimation] = useState(false);

  const onRefTimer = async () => {
    setPlayAnimation(true)
    setTimeout(() => {
      setPlayAnimation(false);
    }, 3000); 
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
    autoplaySpeed: 20000,
    afterChange: onRefTimer
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
                <Avatar
                  src={item.avatar || item.fullname}
                  sx={{ width: 24, height: 24 }}
                />

                <p className={style.customer_name}>
                  Chúc mừng <span>{item.fullname}</span> vừa trở thành thành
                  viên BeautyX!
                </p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
}
