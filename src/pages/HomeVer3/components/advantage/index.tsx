import img from "constants/img";
import styles from "./style.module.css";
import { Container } from "@mui/material";
export function Advantage() {
    return (
        <div className={styles.advantage}>
            <h2 className={styles.title}>Ưu điểm của BeautyX</h2>
            <div className={styles.advantage__list}>
                <div className={styles.advantage__item}>
                    <div className={styles.advantage__item__img}>
                        <img src={img.adadvantage_1} alt="" />
                    </div>
                    <div className={styles.advantage__item__content}>
                        <p>
                            <span>1.</span> Đa dạng địa điểm và dịch vụ làm đẹp
                        </p>
                    </div>
                </div>
                <div className={styles.advantage__item}>
                    <div className={styles.advantage__item__img}>
                        <img src={img.adadvantage_2} alt="" />
                    </div>
                    <div className={styles.advantage__item__content}>
                        <p>
                            <span>2.</span> Nhận hỗ trợ và tư vấn từ đội ngũ
                            chuyên gia uy tín
                        </p>
                    </div>
                </div>
                <div className={styles.advantage__item}>
                    <div className={styles.advantage__item__img}>
                        <img src={img.adadvantage_3} alt="" />
                    </div>
                    <div className={styles.advantage__item__content}>
                        <p>
                            <span>3.</span> Đặt lịch nhanh chóng, linh hoạt
                            khung giờ và nhắc hẹn tự động
                        </p>
                    </div>
                </div>
                <div className={styles.advantage__item}>
                    <div className={styles.advantage__item__img}>
                        <img src={img.adadvantage_4} alt="" />
                    </div>
                    <div className={styles.advantage__item__content}>
                        <p>
                            <span>4.</span> Tận hưởng vô vàn ưu đãi và voucher
                            độc quyền
                        </p>
                    </div>
                </div>
            </div>
            <div className={styles.beautyx__care}>
                <img src={img.btxCare} alt="" />
            </div>
        </div>
    );
}
