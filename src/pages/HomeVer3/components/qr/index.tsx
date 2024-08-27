import { Container } from "@mui/material";
import React from "react";
import styles from "./style.module.css";
import img from "constants/img";

export function Qr() {
    return (
        <div className={styles.qr}>
            <Container maxWidth="md">
                <div className={styles.qr__wrap}>
                    <div className={styles.qr__left}>
                        <h2>Quét mã QR để tải ứng dụng BeautyX</h2>
                        <p>
                            Đặt lịch làm đẹp online tại hơn 10.000 địa điểm làm
                            đẹp uy tín hàng đầu với giá ưu đãi độc quyền chỉ có
                            tại BeautyX!
                        </p>
                        <div className={styles.qr__img}>
                            <img src={img.qr} alt="" />
                        </div>
                        <div className={styles.dowloads}>
                            <div className={styles.dowload}>
                                <img src={img.gg_play} alt="" />
                            </div>
                            <div className={styles.dowload}>
                                <img src={img.appStore} alt="" />
                            </div>
                        </div>
                    </div>
                    <div className={styles.qr__right}>
                        <div className={styles.qr__banner}>
                            <img src={img.qr_banner} alt="" />
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
}
