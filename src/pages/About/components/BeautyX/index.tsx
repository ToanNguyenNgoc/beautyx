import React from "react";
import style from "./style.module.css";
import img from "constants/img";
const data = [
    {
        img: img.btxUser,
        heading: "50.000+",
        text: "Tài khoản đăng ký",
    },
    {
        img: img.btxLocation,
        heading: "10.000+",
        text: "Địa điểm làm đẹp uy tín",
    },
    {
        img: img.btxService,
        heading: "300.000+",
        text: "Dịch vụ làm đẹp chất lượng",
    },
    {
        img: img.btxBooking,
        heading: "300.000+",
        text: "Lượt booking thành công",
    },
    {
        img: img.btxDownload,
        heading: "5.000+",
        text: "Lượt tái mua mỗi tháng",
    },
    {
        img: img.btxRating,
        heading: "4.9/5*",
        text: "Đánh giá chất lượng từ 50.000+ người dùng",
    },
];
export const AboutBeautyX = () => {
    return (
        <div className={style.beautyx}>
            <div className={style.left}>
                <img src={img.btxDevice} alt="" />
            </div>
            <div className={style.right}>
                <h2 className={style.title}>
                    BeautyX <br /> và những con số ấn tượng
                </h2>
                <div className={style.list}>
                    {data.map((item, index) => (
                        <div key={index} className={style.item}>
                            <div className={style.item_img}>
                                <img src={item.img} alt="" />
                            </div>
                            <h3>{item.heading}</h3>
                            <p>{item.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
