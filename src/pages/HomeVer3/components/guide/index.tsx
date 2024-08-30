import { Container } from "@mui/material";
import styles from "./style.module.css";
import img from "constants/img";

export function Guide() {
    return (
        <div className={styles.guide}>
            <Container maxWidth="md">
                <h2 className={styles.title}>Hướng dẫn sử dụng</h2>
                <div className={styles.guide__list}>
                    <div className={styles.guide__item}>
                        <div className={styles.guide__step}>Bước 1</div>
                        <p className={styles.guide__step__desc}>
                            Tìm địa điểm, dịch vụ phù hợp
                        </p>
                        <div className={styles.guide__item__img}>
                            <img src={img.guide_1} alt="" />
                        </div>
                    </div>
                    <div className={styles.guide__item}>
                        <div className={styles.guide__step}>Bước 2</div>
                        <p className={styles.guide__step__desc}>
                            Mua dịch vụ và thanh toán
                        </p>
                        <div className={styles.guide__item__img}>
                            <img src={img.guide_2} alt="" />
                        </div>
                    </div>
                    <div className={styles.guide__item}>
                        <div className={styles.guide__step}>Bước 3</div>
                        <p className={styles.guide__step__desc}>
                            Đặt lịch sau khi mua thành công
                        </p>
                        <div className={styles.guide__item__img}>
                            <img src={img.guide_3} alt="" />
                        </div>
                    </div>
                    <div className={styles.guide__item}>
                        <div className={styles.guide__step}>Bước 4</div>
                        <p className={styles.guide__step__desc}>
                            Đến Spa checkin và sử dụng dịch vụ
                        </p>
                        <div className={styles.guide__item__img}>
                            <img src={img.guide_4} alt="" />
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
}
