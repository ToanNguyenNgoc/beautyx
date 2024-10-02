import React from "react";
import style from "./style.module.css";
import img from "constants/img";
export const AboutStory = () => {
    return (
        <div
            style={{ backgroundImage: `url('${img.aboutBgStory}')` }}
            className={style.story}
        >
            <div className={style.container}>
                <div className={style.story_left}>
                    <h2 className={style.title}>Câu chuyện của chúng tôi</h2>
                    <p>
                        <span>BeautyX</span> - Nền tảng đặt lịch làm đẹp trực
                        tuyến tiên phong tại Việt Nam. Sứ mệnh của chúng tôi
                        không dừng lại ở việc kết nối người dùng và đối tác
                        Nhanh chóng - An toàn, mà còn chú trọng đến trải nghiệm
                        khách hàng trong môi trường làm đẹp, chăm sóc sức khỏe
                        Chất lượng - Tiện ích - Ưu đãi.
                    </p>
                    <p>
                        Trong năm năm tới, BeautyX định vị trở thành nền tảng
                        đặt lịch làm đẹp số một tại thị trường Việt Nam. Song
                        hành tốc độ tăng trưởng của công nghệ, BeautyX chính là
                        giải pháp tương lai đơn giản hóa nhu cầu làm đẹp và chăm
                        sóc sức khỏe của người Việt, mang tới giá trị Chất lượng
                        - Tiện ích - Ưu đãi chỉ với một ứng dụng thông minh.
                    </p>
                </div>
                <div className={style.story_right}>
                    <img src={img.aboutStory} alt="" />
                </div>
            </div>
        </div>
    );
};
