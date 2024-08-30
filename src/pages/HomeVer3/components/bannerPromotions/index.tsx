import { Container } from "@mui/material";
import { usePromotion } from "hooks";
import { FC, useState } from "react";
import { Link } from "react-router-dom";
import Slider, { Settings } from "react-slick";
import { scrollTop, slugify } from "utils";
import styles from "./style.module.css";

// type ArrowProps = {
//     onClick?: () => void;
// };

// const Next: FC<ArrowProps> = ({ onClick }) => {
//     return (
//         <XButton
//             icon={icon.chevronRight}
//             onClick={onClick}
//             className={clst([styles.slide_btn, styles.slide_btn_next])}
//         />
//     );
// };

// const Prev: FC<ArrowProps> = ({ onClick }) => {
//     return (
//         <XButton
//             icon={icon.chevronLeft}
//             onClick={onClick}
//             className={clst([styles.slide_btn, styles.slide_btn_prev])}
//         />
//     );
// };


export const BannerPromotions: FC = () => {
    const { data } = usePromotion();
    const [currentSlide, setCurrentSlide] = useState(0);

    const settings: Settings = {
        dots: true,
        autoplay: false,
        infinite: true,
        arrows: false,
        speed: 800,
        slidesToShow: 3,
        slidesToScroll: 1,
        swipe: true,
        draggable: true,
        // nextArrow: <Next />,
        // prevArrow: <Prev />,
        beforeChange: (oldIndex, newIndex) => setCurrentSlide(newIndex),
        appendDots: dots => (
            <div >
                <ul className={styles.slickDots}>{dots}</ul>
            </div>
        ),
        customPaging: index => (
            <button className={index === currentSlide ? styles.active__dot : undefined}>
                {index + 1}
            </button>
        ),
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
                    {data.map((item) => (
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
