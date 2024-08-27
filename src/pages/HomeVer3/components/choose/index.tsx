import React from "react";
import styles from "./style.module.css";
import img from "constants/img";
import { Container } from "@mui/material";
import Slider from "react-slick";

export default function Choose() {
    const settings = {
        speed: 3000,
        autoplay: true,
        autoplaySpeed: 0,
        cssEase: "linear",
        slidesToShow: 5,
        slidesToScroll: 1,
        infinite: true,
        swipeToSlide: true,
        centerMode: true,
        focusOnSelect: false,
        pauseOnHover: false,
    };
    return (
        <div className={styles.choose}>
            <Container maxWidth="md">
                <h2 className={styles.title}>Vì sao bạn nên chọn BeautyX</h2>
                <p className={styles.desc}>
                    Hàng ngàn đối tác là các thương hiệu spa uy tín trong và
                    ngoài nước
                </p>
                <div className={styles.choose__img}>
                    <img src={img.choose} alt="" />
                </div>
                <div className={styles.choose__slider}>
                    <Slider className={styles.slickList} {...settings}>
                        <div className={styles.choose__item}>
                            <div className={styles.choose__item__img}>
                                <img src={img.thanhmai} alt="" />
                            </div>
                        </div>
                        <div className={styles.choose__item}>
                            <div className={styles.choose__item__img}>
                                <img src={img.thanhmai} alt="" />
                            </div>
                        </div>
                        <div className={styles.choose__item}>
                            <div className={styles.choose__item__img}>
                                <img src={img.thanhmai} alt="" />
                            </div>
                        </div>
                        <div className={styles.choose__item}>
                            <div className={styles.choose__item__img}>
                                <img src={img.thanhmai} alt="" />
                            </div>
                        </div>
                        <div className={styles.choose__item}>
                            <div className={styles.choose__item__img}>
                                <img src={img.thanhmai} alt="" />
                            </div>
                        </div>
                        <div className={styles.choose__item}>
                            <div className={styles.choose__item__img}>
                                <img src={img.thanhmai} alt="" />
                            </div>
                        </div>
                        <div className={styles.choose__item}>
                            <div className={styles.choose__item__img}>
                                <img src={img.thanhmai} alt="" />
                            </div>
                        </div>
                    </Slider>
                </div>
            </Container>
        </div>
    );
}
