import { Badge, Container } from "@mui/material";
import icon from "constants/icon";
import { ICON } from "constants/icon2";
import img from "constants/img";
import { Link } from "react-router-dom";
import styles from "./style.module.css";
import { XButton } from "components/Layout";
import { useState } from "react";
import { styled } from "@mui/material/styles";

export default function HeaderVer3() {
    const SmallBadge = styled(Badge)(({ theme }) => ({
        "& .MuiBadge-badge": {
            fontSize: "10px", // Giảm kích thước font chữ của đếm
            height: "16px", // Giảm kích thước chiều cao của badge
            minWidth: "16px", // Giảm kích thước chiều rộng tối thiểu của badge
            padding: "0 4px", // Thêm padding cho badge
        },
    }));

    const [isLogin, setIsLogin] = useState(true);
    return (
        <header className={styles.header}>
            <Container maxWidth="md">
                <div className={styles.headerContainer}>
                    <div className={styles.headerLeft}>
                        <Link className={styles.logo} to={{ pathname: "/" }}>
                            <img src={img.beautyxSlogan} alt="" />
                        </Link>
                        <div className={styles.locationSelector}>
                            <img src={ICON.gps} alt="gps" />
                            <span className={styles.location}>Khu vực</span>
                            <span className={styles.selectBox}>
                                Hồ Chí Minh
                            </span>
                            <img src={ICON.arrDownBlack} alt="" />
                        </div>
                    </div>

                    <div className={styles.headerRight}>
                        <div className={styles.buttonGroup}>
                            <XButton className={styles.secondaryButton}>
                                Trở thành đối tác
                            </XButton>
                            <div className={styles.toggleContainer}>
                                <div className={styles.toggle}>
                                    <div
                                        className={`${styles.option} ${
                                            !isLogin ? styles.active : ""
                                        }`}
                                        onClick={() => setIsLogin(false)}
                                    >
                                        Đăng ký
                                    </div>
                                    <div
                                        className={`${styles.option} ${
                                            isLogin ? styles.active : ""
                                        }`}
                                        onClick={() => setIsLogin(true)}
                                    >
                                        Đăng nhập
                                    </div>
                                </div>
                            </div>
                            <XButton className={styles.cartIcon}>
                                <SmallBadge
                                    color="error"
                                    badgeContent={100}
                                    max={99}
                                >
                                    <img
                                        width={16}
                                        height={16}
                                        src={ICON.shoppingCart}
                                        alt="Shopping Cart"
                                    />
                                </SmallBadge>
                                Giỏ hàng
                            </XButton>
                            <div className={styles.changeLang}>
                                <img src={img.flagVN} alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </header>
    );
}
