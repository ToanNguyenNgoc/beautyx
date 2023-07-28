import { Avatar } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { statisticApi } from 'api';
import Slider from 'react-slick';
import style from "./style.module.css";

interface ICustomer{
  fullname: string,
  avatar: string
}
export default function HomeStatisticsCustomer() {
  const { data } = useQuery({
    queryKey: ['customer'],
    queryFn: () => {
      return statisticApi.customers()
    }
  })

  // function getRandomAutoplaySpeed() {
  //   const minAutoplaySpeed = 1000; 
  //   const maxAutoplaySpeed = 10000; 
  //   return (
  //     Math.floor(Math.random() * (maxAutoplaySpeed - minAutoplaySpeed + 1)) +
  //     minAutoplaySpeed
  //   );
  // }

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
    autoplaySpeed : 8000
    // autoplaySpeed: Math.round(getRandomAutoplaySpeed() * 1000) / 1000,
  };

  return (
    <>
      <div className={style.customer_wraper}>
        <Slider {...settings}>
          {data?.data?.context?.map((item: ICustomer, index: number) => (
            <div key={index}>
              <div className={style.customer}>
                <Avatar
                  src={item.avatar || item.fullname}
                  sx={{ width: 24, height: 24 }}
                />
                <div className={style.customer_name}>{item.fullname} Vừa tham gia BeautyX</div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
}
