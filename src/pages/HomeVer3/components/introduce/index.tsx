import styles from "./style.module.css";
import { Container } from "@mui/material";
import { XButton } from "components/Layout";
import img from "constants/img";
export function Introduce() {
    return (
        <div className={styles.introduce}>
            <Container maxWidth="md">
                <div className={styles.introduce__wrap}>
                    <div className={styles.introduce__left}>
                        <div className={styles.introduce__content}>
                            <h2>Bạn muốn biết thêm về BeautyX</h2>
                            <p>
                                Ứng dụng đặt lịch hẹn làm đẹp trực tuyến -
                                BeautyX trên smartphone/tablet cung cấp dịch vụ
                                làm đẹp, chăm sóc sức khỏe hàng đầu Việt Nam.
                                Thỏa sức khám phá hơn 10.000 địa điểm spa,
                                salon, clinic trên toàn quốc, đặt lịch sử dụng
                                dịch vụ chỉ trong ít phút và áp dụng vô vàn
                                voucher độc quyền
                            </p>
                            <XButton className={styles.introduce__btn}>
                                Tìm hiểu thêm
                            </XButton>
                        </div>
                        <div className={styles.introduce__left__img}>
                            <img src={img.about_1} alt="" />
                        </div>
                    </div>
                    <div className={styles.introduce__right}>
                        <div className={styles.introduce__content}>
                            <h2>Bạn muốn biết thêm về BeautyX</h2>
                            <p>
                                Ứng dụng đặt lịch hẹn làm đẹp trực tuyến -
                                BeautyX trên smartphone/tablet cung cấp dịch vụ
                                làm đẹp, chăm sóc sức khỏe hàng đầu Việt Nam.
                                Thỏa sức khám phá hơn 10.000 địa điểm spa,
                                salon, clinic trên toàn quốc, đặt lịch sử dụng
                                dịch vụ chỉ trong ít phút và áp dụng vô vàn
                                voucher độc quyền
                            </p>
                            <XButton className={styles.introduce__btn}>
                                Đăng ký
                            </XButton>
                        </div>
                        <div className={styles.introduce__left__img}>
                            <img src={img.about_1} alt="" />
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
}
