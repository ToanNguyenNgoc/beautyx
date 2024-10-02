import React from "react";
import style from "./style.module.css";
import img from "constants/img";
import { ICON } from "constants/icon2";
export const AboutFooter = () => {
    return (
        <>
            <div
                style={{ backgroundImage: `url("${img.aboutFooter}")` }}
                className={style.footer}
            >
                <div className={style.footer_container}>
                    <div className={style.left}>
                        <img src={img.aboutLogo} alt="" />
                    </div>
                    <div className={style.right}>
                        <h2 className={style.title}>
                            BeautyX cam kết mang đến giá trị trải nghiệm cho
                            người dùng
                        </h2>
                        <ul>
                            <li>
                                <img src={ICON.tickGreen} alt="" />
                                <span>
                                    Tìm kiếm spa, salon, phòng khám gần nhà
                                </span>
                            </li>
                            <li>
                                <img src={ICON.tickGreen} alt="" />
                                <span>
                                    Đặt lịch làm đẹp nhanh chóng, tiện lợi
                                </span>
                            </li>
                            <li>
                                <img src={ICON.tickGreen} alt="" />
                                <span>Chọn mua dịch vụ uy tín, an toàn</span>
                            </li>
                            <li>
                                <img src={ICON.tickGreen} alt="" />
                                <span>Hưởng vô vàn ưu đãi hấp dẫn</span>
                            </li>
                            <li>
                                <img src={ICON.tickGreen} alt="" />
                                <span>Thanh toán online đa kênh, tiện lợi</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className={style.footer_bottom}>
                <p>© 2022-2024 BeautyX. All rights reserved.</p>
            </div>
        </>
    );
};
