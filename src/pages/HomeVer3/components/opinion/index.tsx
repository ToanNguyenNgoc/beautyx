import React from "react";
import styles from "./style.module.css";
import { Container } from "@mui/material";
import icon from "constants/icon";
import img from "constants/img";
import Slider, { Settings } from "react-slick";
export function Opinion() {
    // Cấu hình cho Slider của khách hàng
    const customerSettings: Settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false,
    };

    // Cấu hình cho Slider của CEO
    const ceoSettings: Settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false,
    };

    return (
        <section className={styles.opinion}>
            <Container maxWidth="md">
                <div className={styles.opinion__wrap}>
                    <div className={styles.opinion__left}>
                        <div className={styles.opinion__circle__wrap}>
                            <div className={styles.opinion__circle}></div>
                        </div>
                        <Slider
                            {...customerSettings}
                            className={styles.slider__customer}
                        >
                            <div className={styles.slider__customer__item}>
                                <h2 className={styles.title}>
                                    Ý kiến từ Khách hàng
                                </h2>
                                <div className={styles.opinion__content}>
                                    <div
                                        className={styles.opinion__content__top}
                                    >
                                        <div
                                            className={
                                                styles.opinion__vote__list
                                            }
                                        >
                                            {[...Array(5)].map((_, index) => (
                                                <div
                                                    key={index}
                                                    className={
                                                        styles.opinion__vote__item
                                                    }
                                                >
                                                    <img
                                                        src={icon.star}
                                                        alt="star"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                        <p
                                            className={
                                                styles.opinion__customer__name
                                            }
                                        >
                                            Sinsinciuciu
                                        </p>
                                    </div>
                                    <div
                                        className={
                                            styles.opinion__content__bottom
                                        }
                                    >
                                        <div className={styles.comment__title}>
                                            Tuyệt vời
                                        </div>
                                        <div className={styles.comment__desc}>
                                            Lorem, ipsum dolor sit amet
                                            consectetur adipisicing elit.
                                            Expedita ullam voluptatibus dolores
                                            aut culpa voluptate quia harum iste
                                            placeat ea natus pariatur, numquam
                                            saepe quis?
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.slider__customer__item}>
                                <h2 className={styles.title}>
                                    Ý kiến từ Khách hàng
                                </h2>
                                <div className={styles.opinion__content}>
                                    <div
                                        className={styles.opinion__content__top}
                                    >
                                        <div
                                            className={
                                                styles.opinion__vote__list
                                            }
                                        >
                                            {[...Array(5)].map((_, index) => (
                                                <div
                                                    key={index}
                                                    className={
                                                        styles.opinion__vote__item
                                                    }
                                                >
                                                    <img
                                                        src={icon.star}
                                                        alt="star"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                        <p
                                            className={
                                                styles.opinion__customer__name
                                            }
                                        >
                                            Sinsinciuciu
                                        </p>
                                    </div>
                                    <div
                                        className={
                                            styles.opinion__content__bottom
                                        }
                                    >
                                        <div className={styles.comment__title}>
                                            Tuyệt vời
                                        </div>
                                        <div className={styles.comment__desc}>
                                            Lorem, ipsum dolor sit amet
                                            consectetur adipisicing elit.
                                            Expedita ullam voluptatibus dolores
                                            aut culpa voluptate quia harum iste
                                            placeat ea natus pariatur, numquam
                                            saepe quis?
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.slider__customer__item}>
                                <h2 className={styles.title}>
                                    Ý kiến từ Khách hàng
                                </h2>
                                <div className={styles.opinion__content}>
                                    <div
                                        className={styles.opinion__content__top}
                                    >
                                        <div
                                            className={
                                                styles.opinion__vote__list
                                            }
                                        >
                                            {[...Array(5)].map((_, index) => (
                                                <div
                                                    key={index}
                                                    className={
                                                        styles.opinion__vote__item
                                                    }
                                                >
                                                    <img
                                                        src={icon.star}
                                                        alt="star"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                        <p
                                            className={
                                                styles.opinion__customer__name
                                            }
                                        >
                                            Sinsinciuciu
                                        </p>
                                    </div>
                                    <div
                                        className={
                                            styles.opinion__content__bottom
                                        }
                                    >
                                        <div className={styles.comment__title}>
                                            Tuyệt vời
                                        </div>
                                        <div className={styles.comment__desc}>
                                            Lorem, ipsum dolor sit amet
                                            consectetur adipisicing elit.
                                            Expedita ullam voluptatibus dolores
                                            aut culpa voluptate quia harum iste
                                            placeat ea natus pariatur, numquam
                                            saepe quis?
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Slider>
                    </div>
                    <div className={styles.opinion__right}>
                        <div className={styles.opinion__circle__wrap}>
                            <div className={styles.opinion__circle}></div>
                        </div>
                        <Slider {...ceoSettings} className={styles.slider__ceo}>
                            <div className={styles.slider__ceo__item}>
                                <div className={styles.opinion__ceo}>
                                    <img src={img.ceoPMT} alt="CEO" />
                                </div>
                                <h2 className={styles.title}>
                                    Ý kiến từ Chuyên gia
                                </h2>
                                <div className={styles.opinion__content}>
                                    <div>
                                        <h3>Bác sĩ CKII Phạm Minh Trường</h3>
                                        <p
                                            className={
                                                styles.opinion__right__desc
                                            }
                                        >
                                            Founder và CEO PMT Aesthetic Clinic
                                        </p>
                                    </div>
                                    <p
                                        className={
                                            styles.opinion__right__comment
                                        }
                                    >
                                        Lorem ipsum dolor sit amet, consectetur
                                        adipisicing elit. Modi dicta itaque
                                        suscipit labore perspiciatis numquam
                                        nihil. Repellat sint, nemo earum
                                        cupiditate quas rerum?
                                    </p>
                                </div>
                            </div>
                            <div className={styles.slider__ceo__item}>
                                <div className={styles.opinion__ceo}>
                                    <img src={img.ceoPMT} alt="CEO" />
                                </div>
                                <h2 className={styles.title}>
                                    Ý kiến từ Chuyên gia
                                </h2>
                                <div className={styles.opinion__content}>
                                    <div>
                                        <h3>Bác sĩ CKII Phạm Minh Trường</h3>
                                        <p
                                            className={
                                                styles.opinion__right__desc
                                            }
                                        >
                                            Founder và CEO PMT Aesthetic Clinic
                                        </p>
                                    </div>
                                    <p
                                        className={
                                            styles.opinion__right__comment
                                        }
                                    >
                                        Lorem ipsum dolor sit amet, consectetur
                                        adipisicing elit. Modi dicta itaque
                                        suscipit labore perspiciatis numquam
                                        nihil. Repellat sint, nemo earum
                                        cupiditate quas rerum?
                                    </p>
                                </div>
                            </div>
                            <div className={styles.slider__ceo__item}>
                                <div className={styles.opinion__ceo}>
                                    <img src={img.ceoPMT} alt="CEO" />
                                </div>
                                <h2 className={styles.title}>
                                    Ý kiến từ Chuyên gia
                                </h2>
                                <div className={styles.opinion__content}>
                                    <div>
                                        <h3>Bác sĩ CKII Phạm Minh Trường</h3>
                                        <p
                                            className={
                                                styles.opinion__right__desc
                                            }
                                        >
                                            Founder và CEO PMT Aesthetic Clinic
                                        </p>
                                    </div>
                                    <p
                                        className={
                                            styles.opinion__right__comment
                                        }
                                    >
                                        Lorem ipsum dolor sit amet, consectetur
                                        adipisicing elit. Modi dicta itaque
                                        suscipit labore perspiciatis numquam
                                        nihil. Repellat sint, nemo earum
                                        cupiditate quas rerum?
                                    </p>
                                </div>
                            </div>
                        </Slider>
                    </div>
                </div>
            </Container>
        </section>
    );
}
