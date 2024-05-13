/* eslint-disable react-hooks/exhaustive-deps */
import { IOrderV2, IPaymentMethod } from "interface";
import { FC, memo, useEffect, useRef } from "react";
import img from "constants/img";
import { MOMO, OTHER, PAY_ON_BTX } from "common";
import { XButton } from "components/Layout";
import style from "../payment.module.css"
import { useCancelByTime, openWindowPayon } from "pages/CartPaymentStatus";
import icon from "constants/icon";
import CopyToClipboard from "react-copy-to-clipboard";
import { Link } from "react-router-dom";

interface PaymentProps {
  pay_url: string,
  payment_method: IPaymentMethod,
  res: IOrderV2,
  orderStatus:any
}

const PaymentRender: FC<PaymentProps> = ({ pay_url, payment_method, res, orderStatus }) => {
  const onRenderPayment = () => {
    switch (payment_method.name_key) {
      case MOMO.name_key:
        return <MomoRender pay_url={pay_url} />;
      case PAY_ON_BTX.name_key:
        return <PayonRender pay_url={pay_url}/>;
      case OTHER.name_key:
        return <OtherRender res={res} />
      default:
        <>
        </>
        break;
    }
  }

  return (
    <div>
      {onRenderPayment()}
    </div>
  )
}
export default memo(PaymentRender)
const MomoRender = ({ pay_url }: { pay_url: string }) => {
  const { sec } = useCancelByTime()
  return (
    <div className={style.payment_left_body} >
      <span className={style.title}>
        Thực hiện theo hướng dẫn sau để thanh toán
      </span>
      <ul className={style.payment_left_body_guide}>
        <li className={style.guide_item}>
          <h4>Bước 1:</h4>Mở ứng dụng <h4>MOMO</h4> hoặc app ngân hàng để thanh toán
        </li>
        <li className={style.guide_item}>
          <h4>Bước 2:</h4>Chọn<h4>"Thanh toán"</h4> và quét mã QR tại đây
        </li>
        <li className={style.guide_item}>
          <h4>Bước 3:</h4>Hoàn thành các bước thanh toán và đợi<h4>BeautyX</h4> xử lý trong giây lát
        </li>
      </ul>
      <div className={style.payment_left_body_status}>
        <div className={style.payment_status_icon}>
          <img src={img.imgDefault} alt="" />
        </div>
        <div className={style.payment_status_decs}>
          <div className={style.payment_status_decs_top}>
            <span className={style.payment_status_decs_top_title}>
              Trạng thái thanh toán:
            </span>
            <span style={{ backgroundColor: "#F5D91D" }} className={style.payment_status_decs_top_box}>
              Chờ thanh toán
            </span>
          </div>
          <div className={style.payment_status_decs_bot}>
            <span>Đơn hàng sẽ bị hủy sau</span>
            <h3>
              {`0${Math.floor(sec / 60)}`.slice(-2)}:
              {`0${sec - Math.floor(sec / 60) * 60}`.slice(-2)}
            </h3>
          </div>
        </div>
      </div>
      <div className={style.payment_left_qr_cnt}>
        <iframe
          className={style.payment_left_qr}
          src={`${pay_url}`}
          title="This is a unique title"
        />
      </div>
    </div>
  )
}
const PayonRender = ({ pay_url }: { pay_url: string }) => {
  
  useEffect(() => {
    const timer = setTimeout(() => {
      openWindowPayon(pay_url)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])
  return (
    <div className={style.payment_left_body}>
      <span className={style.title}>
        Thực hiện theo hướng dẫn sau để thanh toán
      </span>
      <div className={style.payment_left_open_payment}>
        <XButton className={style.open_payment_btn} onClick={()=>openWindowPayon(pay_url)}>
          Thanh toán
        </XButton>
      </div>
    </div>
  )
}
const OtherRender = ({ res }: { res: IOrderV2 }) => {
  const aRef = useRef<HTMLAnchorElement>(null)
  const download = () => {
    if (aRef.current) {
      var file = new Blob(
        [String(res.payment_gateway?.extra_data?.url_checkout)],
        { type: "image/*" }
      );
      aRef.current.href = URL.createObjectURL(file);
      aRef.current.download = "image.jpg";
      aRef.current.click();
    }
  }
  return (
    <div className={style.payment_left_body}>
      <span className={style.title}>
        Thực hiện theo hướng dẫn sau để thanh toán
      </span>
      <div className={style.payment_left_other}>
        <p className={style.payment_left_other_title}>Bạn vui lòng CK số tiền  bằng cách quét mã QR của ngân hàng sau:</p>
        <div className={style.payment_left_other_qr}>
          <img src={String(res.payment_gateway?.extra_data?.url_checkout)} className={style.qr_img} alt="" />
          <a
            className={style.qr_img_download_btn} ref={aRef}
            href={String(res.payment_gateway?.extra_data?.url_checkout)}
            download onClick={download}
          >
            <img src={icon.downLoadWhite} alt="" />
          </a>
          <p className={style.bank_name}>
            {res.payment_gateway?.extra_data?.bank_account_name}
          </p>
          <div className={style.bank_account_number}>
            {res.payment_gateway?.extra_data?.bank_number}
            <CopyToClipboard text={String(res.payment_gateway?.extra_data?.bank_number)}>
              <XButton className={style.copy_info_btn} icon={icon.copyWhite} iconSize={14} />
            </CopyToClipboard>
          </div>
        </div>
      </div>
      <div className={style.payment_left_other_desc}>
        <div className={style.other_desc_row}>
          <label>Chủ TK nhận tiền:</label>
          <span>{res.payment_gateway?.extra_data?.bank_name}</span>
        </div>
        <div className={style.other_desc_row}>
          <label>Nội dung CK bắt buộc là:</label>
          <span>{res.payment_gateway?.extra_data?.bank_title}</span>
          <CopyToClipboard text={String(res.payment_gateway?.extra_data?.bank_title)}>
            <XButton className={style.copy_info_btn} icon={icon.copyWhite} iconSize={14} />
          </CopyToClipboard>
        </div>
      </div>
      <div className={style.payment_left_other_guide}>
        <p>Phải nhập chính xác nội dung CK mà hệ thống đã hiển thị để thanh toán</p>
        <p>
          Trường hợp sau vài phút mà trạng thái thanh toán không đổi tại trang:
          <Link className={style.link_order} to={'/tai-khoan/lich-su-mua'} >Đơn hàng</Link>
          vui lòng liên hệ hotline:
          <a href="tel:0343131003">0343 131 003</a>
        </p>
      </div>
    </div>
  )
}

