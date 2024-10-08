import { FC, useState } from "react";
import style from './partner.module.css'
import { Container } from "@mui/material";
import assets_partner from "./assets";
import { XButton } from "components/Layout";
import { clst } from "utils";
import { PartnerForm } from "./components";

const Partner: FC = () => {
  const [open, setOpen] = useState(false)
  const benefit_list = [
    { content: 'Bán sản phẩm, dịch vụ ngay trên nền tảng, chủ động tiếp cận khách hàng', icon: assets_partner.benefit1 },
    { content: 'Khách hàng tự đặt lịch liệu trình, hạn chế sai sót thông tin đặt hẹn', icon: assets_partner.benefit2 },
    { content: 'Giúp doanh nghiệp được ưu tiên nhờ tính năng lựa chọn theo khu vực', icon: assets_partner.benefit3 },
    { content: 'Hỗ trợ Marketing giúp doanh nghiệp kết nối trực tiếp với khách hàng, chốt lịch hẹn nhanh chóng', icon: assets_partner.benefit4 },
    { content: 'Đơn giản hóa cập nhật trạng thái trước, trong và sau khi khách hàng sử dụng dịch vụ', icon: assets_partner.benefit5 },
    { content: 'Đăng tải hình ảnh, thông tin, đánh giá thúc đẩy quảng bá cho thương hiệu', icon: assets_partner.benefit6 },
  ]
  return (
    <>
      <Container>
        <div className={style.cnt}>
          <div className={style.cnt_banner}>
            <div className={style.circle_cnt} />
            <div className={style.circle_cnt_1} />
            <div className={style.banner_content}>
              <div className={style.banner_content_left}>
                <p className={style.banner_content_left_title}>
                  Trở thành Đối tác BeautyX ngay hôm nay!
                </p>
                <span className={style.banner_content_left_item}>
                  <img src={assets_partner.arrowRight} alt="" />
                  Hỗ trợ quay, dựng video TikTok
                </span>
                <span className={style.banner_content_left_item}>
                  <img src={assets_partner.arrowRight} alt="" />
                  Bán hàng đa kênh tạo doanh thu lớn
                </span>
                <span className={style.banner_content_left_item}>
                  <img src={assets_partner.arrowRight} alt="" />
                  Hỗ trợ Marketing - Truyền thông
                </span>
                <span className={style.banner_content_left_item}>
                  <img src={assets_partner.arrowRight} alt="" />
                  Hỗ trợ lên deal trang chủ
                </span>
                <span className={style.banner_content_left_item}>
                  <img src={assets_partner.arrowRight} alt="" />
                  Chiết khấu hấp dẫn
                </span>
                <XButton onClick={() => setOpen(true)} className={style.banner_content_btn} >
                  Đăng ký ngay
                </XButton>
              </div>
              <img src={assets_partner.image} className={style.banner_content_img} alt="" />
            </div>
          </div>
          <div className={style.section_cnt}>
            <p className={style.section_title}>
              Lợi ích khi trở thành Đối tác BeautyX
            </p>
            <ul className={style.benefit_list}>
              {
                benefit_list.map((item, index) => (
                  <li key={index} className={style.benefit_item}>
                    <div className={style.benefit_item_de}>
                      <span>{item.content}</span>
                      <img src={item.icon} alt="" />
                    </div>
                  </li>
                ))
              }
            </ul>
          </div>
          <div className={style.section_cnt}>
            <p className={style.section_title}>
              4 bước đăng ký gian hàng trên BeautyX
            </p>
            <ul className={style.step_list}>
              <li className={style.step_item_cnt}>
                <div className={style.step_item_number}>1</div>
                <img src={assets_partner.callCalling} alt="" />
                <p className={style.step_item_label}>ĐĂNG KÝ & XÁC NHẬN</p>
                <span className={style.step_item_desc}>
                  Điền thông tin vào <span onClick={() => setOpen(true)}>mẫu đăng ký</span> hoặc gọi hotline <span>034 3131 003</span>
                </span>
              </li>
              <li className={style.step_item_cnt}>
                <div className={style.step_item_number}>2</div>
                <img src={assets_partner.medalStar} alt="" />
                <p className={style.step_item_label}>HỢP ĐỒNG TRIỂN KHAI</p>
                <span className={style.step_item_desc}>
                  Ký kết hợp đồng để triển khai tính năng kinh doanh đa kênh
                </span>
              </li>
              <li className={style.step_item_cnt}>
                <div className={style.step_item_number}>3</div>
                <img src={assets_partner.medalStar} alt="" />
                <p className={style.step_item_label}>BÁN HÀNG CÙNG BEAUTYX</p>
                <span className={style.step_item_desc}>
                  Doanh nghiệp xác nhận và bắt đầu bán hàng trên BeautyX
                </span>
              </li>
            </ul>
          </div>
        </div>
      </Container>
      <div className={style.footer}>
        <Container>
          <div className={style.footer_cnt}>
            <div className={style.footer_img}>
              <img src={assets_partner.imageFooter} alt="" />
              <img src={assets_partner.reItem} className={style.footer_re_item_img} alt="" />
            </div>
            <div className={style.footer_content}>
              <span>Trở thành Đối tác BeautyX <br /> ngay hôm nay!</span>
              <XButton onClick={() => setOpen(true)} className={clst([style.banner_content_btn, style.banner_content_btn_footer])} >
                Đăng ký ngay
              </XButton>
            </div>
          </div>
        </Container>
      </div>
      <PartnerForm open={open} onClose={() => setOpen(false)} />
    </>
  )
}

export default Partner