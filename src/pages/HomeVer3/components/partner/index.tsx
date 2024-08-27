import styles from "./style.module.css";
import { Container } from "@mui/material";
import img from "constants/img";
export function Partner() {
    return (
        <div className={styles.partner}>
            <Container maxWidth="md">
                <div className={styles.partner__wrap}>
                    <div className={styles.partner__left}>
                        <h2>Đối tác của BeautyX</h2>
                    </div>
                    <div className={styles.partner__right}>
                        <div className={styles.partner__img}>
                            <img src={img.vn_pay} alt="" />
                        </div>
                        <div className={styles.partner__img}>
                            <img src={img.zalo_pay} alt="" />
                        </div>
                        <div className={styles.partner__img}>
                            <img src={img.momo} alt="" />
                        </div>
                        <div className={styles.partner__img}>
                            <img src={img.vcb} alt="" />
                        </div>
                        <div className={styles.partner__img}>
                            <img src={img.mb_bank} alt="" />
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
}
