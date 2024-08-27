import { Container } from "@mui/material";
import styles from "./style.module.css";
import icon from "constants/icon";
import img from "constants/img";
import Slider, { Settings } from "react-slick";
import { useRef } from "react";

export function Address() {
    const sliderRef = useRef<Slider>(null);

    const settings: Settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        arrows: false,
    };
    const handlePrevClick = () => {
        sliderRef.current?.slickPrev();
    };

    const handleNextClick = () => {
        sliderRef.current?.slickNext();
    };
    return (
        <div className={styles.address}>
            <Container maxWidth="md">
                <div className={styles.address__wrap}>
                    <div className={styles.address__left}>
                        <p>Địa điểm được đề xuất</p>
                        <div className={styles.arrow_wrap}>
                            <div
                                className={`${styles.arrow} ${styles.arrow__left}`}
                                onClick={handlePrevClick}
                            >
                                <img src={icon.chevronLeft} alt="Previous" />
                            </div>
                            <div
                                className={`${styles.arrow} ${styles.arrow__right}`}
                                onClick={handleNextClick}
                            >
                                <img src={icon.chevronLeft} alt="Next" />
                            </div>
                        </div>
                    </div>
                    <div className={styles.address__right}>
                        <div className={styles.address__list}>
                            <Slider
                                className={styles.slistSlider}
                                {...settings}
                                ref={sliderRef}
                            >
                                <div className={styles.address__item__wrap}>
                                    <div className={styles.address__item}>
                                        <div
                                            className={
                                                styles.address__item__img
                                            }
                                        >
                                            <img src={img.guide_4} alt="" />
                                        </div>
                                        <p>Spa - Quận 1</p>
                                    </div>
                                </div>
                                <div className={styles.address__item__wrap}>
                                    <div className={styles.address__item}>
                                        <div
                                            className={
                                                styles.address__item__img
                                            }
                                        >
                                            <img src={img.guide_4} alt="" />
                                        </div>
                                        <p>Spa - Quận 1</p>
                                    </div>
                                </div>
                                <div className={styles.address__item__wrap}>
                                    <div className={styles.address__item}>
                                        <div
                                            className={
                                                styles.address__item__img
                                            }
                                        >
                                            <img src={img.guide_4} alt="" />
                                        </div>
                                        <p>Spa - Quận 1</p>
                                    </div>
                                </div>
                                <div className={styles.address__item__wrap}>
                                    <div className={styles.address__item}>
                                        <div
                                            className={
                                                styles.address__item__img
                                            }
                                        >
                                            <img src={img.guide_4} alt="" />
                                        </div>
                                        <p>Spa - Quận 1</p>
                                    </div>
                                </div>
                                <div className={styles.address__item__wrap}>
                                    <div className={styles.address__item}>
                                        <div
                                            className={
                                                styles.address__item__img
                                            }
                                        >
                                            <img src={img.guide_4} alt="" />
                                        </div>
                                        <p>Spa - Quận 1</p>
                                    </div>
                                </div>
                                <div className={styles.address__item__wrap}>
                                    <div className={styles.address__item}>
                                        <div
                                            className={
                                                styles.address__item__img
                                            }
                                        >
                                            <img src={img.guide_4} alt="" />
                                        </div>
                                        <p>Spa - Quận 1</p>
                                    </div>
                                </div>
                            </Slider>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
}
