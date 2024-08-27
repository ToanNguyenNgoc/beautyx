import { Container } from "@mui/material";
import img from "constants/img";
import styles from "./style.module.css";
import { ICON } from "constants/icon2";

export function Hero() {
    return (
        <div className={styles.hero}>
            <Container maxWidth="md">
                <div className={styles.hero__img}>
                    <img src={img.heroHomeV3} alt="hero" />
                    <div className={styles.hero__title}>
                        <h1>Địa điểm làm đẹp trong tầm tay cùng beautyX</h1>
                    </div>
                </div>
                <div className={styles.hero__filter}>
                    <div className={styles.filter__wrap}>
                        <div className={styles.tabs}>
                            <div className={`${styles.tab} ${styles.active}`}>
                                <div className={styles.tab__img}>
                                    <img src={ICON.cateSpa} alt="icon" />
                                </div>
                                <p className={styles.tab__name}>Spa</p>
                            </div>
                            <div className={styles.tab}>
                                <div className={styles.tab__img}>
                                    <img src={ICON.cateSalon} alt="icon" />
                                </div>
                                <p className={styles.tab__name}>Salon</p>
                            </div>
                            <div className={styles.tab}>
                                <div className={styles.tab__img}>
                                    <img src={ICON.searchGray} alt="icon" />
                                </div>
                                <p className={styles.tab__name}>Tìm theo tên</p>
                            </div>
                        </div>
                        <div className={styles.filters}>
                            <div className={styles.filter}>
                                <div className={styles.filters__title}>
                                    <div className={styles.icon}>
                                        <img src={ICON.locationGray} alt="" />
                                    </div>
                                    <p>Địa điểm</p>
                                </div>
                                <div className={styles.filters__select}>
                                    <p>Hồ Chí Minh</p>
                                    <img src={ICON.arrDownBlack} alt="" />
                                </div>
                            </div>
                            <div className={styles.filter}>
                                <div className={styles.filters__title}>
                                    <div className={styles.icon}>
                                        <img src={ICON.categoryGray} alt="" />
                                    </div>
                                    <p>Danh mục</p>
                                </div>
                                <div className={styles.filters__select}>
                                    <p>Hồ Chí Minh</p>
                                    <img src={ICON.arrDownBlack} alt="" />
                                </div>
                            </div>
                        </div>

                        <button className={styles.searchButton}>
                            Tìm kiếm
                        </button>
                    </div>
                </div>
            </Container>
        </div>
    );
}
