import React from "react";
import style from "./style.module.css";
import img from "constants/img";
export const AboutHero = () => {
    return (
        <div
            style={{ backgroundImage: `url('${img.aboutBgHero}')` }}
            className={style.hero_container}
        >
            <div className={style.hero}>
                <div className={style.hero_left}>
                    <img src={img.aboutHero} alt="About Hero" />
                    <div className={style.hero_left_finger}>
                        <div className={style.finger_img}>
                            <img src={img.fingerprint} alt="" />
                        </div>
                        <div className={style.finger_content}>
                            <p>
                                Tải BeautyX và bước vào khám phá thế giới làm
                                đẹp hoàn hảo ngay hôm nay!
                            </p>
                            <p>Chỉ một chạm!</p>
                        </div>
                    </div>
                </div>
                <div className={style.hero_right}>
                    <div className={style.hero_title_wrap}>
                        <div className={style.hero_title}>
                            <div className={style.hero_right_img}>
                                <img src={img.beautyxSlogan} alt="Slogan" />
                            </div>
                            <p>Trải nghiệm</p>
                        </div>
                        <div className={style.hero_title}>
                            <p>làm đẹp hoàn hảo</p>
                            <div className={style.hero_imgs}>
                                <div className={style.hero_img}>
                                    <img
                                        src={img.aboutHero1}
                                        alt="HeroImage 1"
                                    />
                                </div>
                                <div className={style.hero_img}>
                                    <img
                                        src={img.aboutHero2}
                                        alt="HeroImage 2"
                                    />
                                </div>
                                <div className={style.hero_img}>
                                    <img
                                        src={img.aboutHero3}
                                        alt="HeroImage 3"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <p className={style.hero_desc}>
                        Bạn xứng đáng được chăm sóc một cách tốt nhất!
                        <br />
                        Chúng tôi mở ra cộng đồng kết nối bạn với các địa điểm
                        làm đẹp uy tín, nơi bạn dễ dàng tìm thấy dịch vụ phù hợp
                        nhất với nhu cầu và sở thích. Chất lượng trải nghiệm của
                        khách hàng luôn là ưu tiên hàng đầu và là nguồn cảm hứng
                        của đội ngũ BeautyX. Hãy để chúng tôi giúp bạn yêu chiều
                        bản thân mỗi ngày.
                    </p>
                    <p className={style.hero_desc}>
                        Làm đẹp là một "hành trình" thú vị và BeautyX sẽ đồng
                        hành cùng bạn trên mọi "bước đi".
                    </p>
                </div>
            </div>
        </div>
    );
};
