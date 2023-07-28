import img from 'constants/img';
import { EXTRA_PAYMENT } from 'rootComponents/extraPayment';
import PaymentRender from "./PaymentRender"
import style from '../payment.module.css'

function PaymentQr(props: any) {
    const {
        orderStatus,
        res
    } = props;
    const EX_PAYMENT = EXTRA_PAYMENT(res);
    const pay_url = EX_PAYMENT?.qrCode;
    const checkStatus = () => {
        switch (orderStatus) {
            case "PENDING":
                return <PaymentRender payment_method={res.payment_method} pay_url={pay_url} res={res} />;
            case "PAID":
                return (
                    <div className={style.payment_left_body} >
                        <span className={style.title}>
                            Thông tin
                        </span>
                        <div className={style.payment_left_body_status}>
                            <div className={style.payment_status_icon}>
                                <img src={img.imgDefault} alt="" />
                            </div>
                            <div className={style.payment_status_decs}>
                                <div className={style.payment_status_decs_top}>
                                    <span className={style.payment_status_decs_top_title}>
                                        Trạng thái thanh toán:
                                    </span>
                                    <span
                                        style={{ backgroundColor: "var(--green)" }}
                                        className={style.payment_status_decs_top_box}
                                    >
                                        Thanh toán thành công
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case "CANCELED_BY_USER":
                return (
                    <div className={style.payment_left_body} >
                        <span className={style.title}>
                            Thông tin
                        </span>
                        <div className={style.payment_left_body_status}>
                            <div className={style.payment_status_icon}>
                                <img src={img.imgDefault} alt="" />
                            </div>
                            <div className={style.payment_status_decs}>
                                <div className={style.payment_status_decs_top}>
                                    <span className={style.payment_status_decs_top_title}>
                                        Trạng thái thanh toán:
                                    </span>
                                    <span
                                        style={{ backgroundColor: "var(--red_2)" }}
                                        className={style.payment_status_decs_top_box}
                                    >
                                        Đơn hàng đã bị hủy
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case "CANCELED":
                return (
                    <div className={style.payment_left_body} >
                        <span className={style.title}>
                            Thông tin
                        </span>
                        <div className={style.payment_left_body_status}>
                            <div className={style.payment_status_icon}>
                                <img src={img.imgDefault} alt="" />
                            </div>
                            <div className={style.payment_status_decs}>
                                <div className={style.payment_status_decs_top}>
                                    <span className={style.payment_status_decs_top_title}>
                                        Trạng thái thanh toán:
                                    </span>
                                    <span
                                        style={{ backgroundColor: "var(--red_2)" }}
                                        className={style.payment_status_decs_top_box}
                                    >
                                        Đơn hàng đã bị hủy
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            default:
                break;
        }
    }
    return (
        <div
            className={style.container_qr}
        >
            {checkStatus()}
        </div>
    );
}

export default PaymentQr;