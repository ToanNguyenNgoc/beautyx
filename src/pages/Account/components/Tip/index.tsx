import { useQuery } from "@tanstack/react-query";
import tipsApi from "api/tipApi";
import { QR_KEY, STALE_TIME } from "config";
import IStore from "interface/IStore";
import { useSelector } from "react-redux";
import style from "./tip.module.css";
import Slider, { Settings } from "react-slick";
import { ITip } from "interface";
import Skeleton from "@mui/material/Skeleton";
import useDeviceMobile from "hooks/useDeviceMobile";
import img from "constants/img";

export default function Tip() {
    const { USER } = useSelector((state: IStore) => state.USER);
    const IS_MB = useDeviceMobile();
    const { data, isLoading } = useQuery({
        queryKey: [QR_KEY.TIP],
        queryFn: () => tipsApi.getAll(),
        staleTime: STALE_TIME,
        enabled: !!USER,
    });
    const tip = data?.context?.data ?? [];
    const settings: Settings = {
        dots: false,
        arrows: false,
        fade: true,
        speed: 0,
        autoplay: true,
        autoplaySpeed: 5000,
        vertical: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 1,
        responsive: [
            {
                breakpoint: 600,
                settings: {
                    fade: false,
                    speed: 600,
                },
            },
        ],
    };
    return (
        <>
            {tip && (
                <div className={style.tip}>
                    {isLoading ? (
                        <Skeleton
                            className={style.tip__loading}
                            height={IS_MB ? 106 : 116}
                            variant="rectangular"
                            animation="wave"
                        />
                    ) : (
                        <Slider {...settings}>
                            {tip?.map((item: ITip) => (
                                <div key={item.id} className={style.tip__wrap}>
                                    <div className={style.tip__top}>
                                        <img className={style.tip__img} src={img.tip} alt="tip" />
                                        <p>Tips!</p>
                                    </div>
                                    <p className={style.tip__text}>
                                        {item.name}
                                    </p>
                                </div>
                            ))}
                        </Slider>
                    )}
                </div>
            )}
        </>
    );
}
