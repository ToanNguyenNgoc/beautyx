import { XButton } from "components/Layout";
import { FC } from "react";
import Slider, { Settings } from "react-slick";
import { Link } from "react-router-dom";
import { clst, scrollTop, slugify } from "utils";
import icon from "constants/icon";
import { usePromotion } from "hooks";
import styles from "./style.module.css";
import { Container } from "@mui/material";

type ArrowProps = {
    onClick?: () => void;
};

const Next: FC<ArrowProps> = ({ onClick }) => {
    return (
        <XButton
            icon={icon.chevronRight}
            onClick={onClick}
            className={clst([styles.slide_btn, styles.slide_btn_next])}
        />
    );
};

const Prev: FC<ArrowProps> = ({ onClick }) => {
    return (
        <XButton
            icon={icon.chevronLeft}
            onClick={onClick}
            className={clst([styles.slide_btn, styles.slide_btn_prev])}
        />
    );
};

export const BannerPromotions: FC = () => {
    const { data } = usePromotion();

    const settings: Settings = {
        dots: false,
        autoplay: true,
        infinite: true,
        arrows: true,
        speed: 800,
        slidesToShow: 3,
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
    };

    return data && data.length ? (
        <div className={styles.BannerPromotions}>
            <Container maxWidth="md">
                <Slider className={styles.slickList} {...settings}>
                    {data?.map((item) => (
                        <Link
                            onClick={() => scrollTop("auto")}
                            key={item.id}
                            className={styles.deal__item}
                            to={{ pathname: `/deal/${slugify(item.name)}` }}
                        >
                            <div className={styles.deal__img}>
                                <img
                                    src={item.thumbnail_url || ""}
                                    alt={item.name}
                                />
                            </div>
                        </Link>
                    ))}
                </Slider>
            </Container>
        </div>
    ) : null;
};
