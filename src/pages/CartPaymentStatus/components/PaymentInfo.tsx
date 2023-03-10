import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { EXTRA_PAYMENT } from 'rootComponents/extraPayment';
import { EXTRA_FLAT_FORM } from 'api/extraFlatForm';
import doPostMakePaymentMessageTiki from 'rootComponents/tiki/doPostMessageTiki';
import { FLAT_FORM_TYPE } from 'rootComponents/flatForm';
import doPostMakePaymentMessageMB from 'rootComponents/mb/doPostMessageMBbank';
import UserPaymentInfo from 'pages/Account/components/UserPaymentInfo';
import { onErrorImg } from 'utils';
import formatPrice from 'utils/formatPrice';
import style from '../payment.module.css'
import img from 'constants/img';
import { useDeviceMobile } from 'hooks';
import { ICart } from 'interface';
import { XButton } from 'components/Layout';

function PaymentInfo(props: any) {
    const history = useHistory()
    const IS_MB = useDeviceMobile()
    const { data, handleCancelOrder, action, orderItems } = props;
    const organization = data.res?.organization;
    const [items,] = useState(orderItems)
    const [servicesOrder,] = useState(items?.filter((i: ICart) => i.is_type === 'SERVICE'))
    const EX_PAYMENT = EXTRA_PAYMENT(data.res);
    const FLAT_FORM = EXTRA_FLAT_FORM();
    const deepLink = EX_PAYMENT?.deepLink;
    const EXTRA_PAYMENT_ID = EX_PAYMENT?.EXTRA_PAYMENT_ID;
    const openPaymentPlatformTiki = () => {
        doPostMakePaymentMessageTiki({
            TYPE: "ORDER",
            params: EXTRA_PAYMENT_ID
        })
    }
    const openDeepLinkPayment = () => {
        if (FLAT_FORM) {
            switch (FLAT_FORM) {
                case FLAT_FORM_TYPE.MOMO:
                    return window.location.assign(EX_PAYMENT?.deepLink);
                case FLAT_FORM_TYPE.TIKI:
                    return openPaymentPlatformTiki()
                case FLAT_FORM_TYPE.MB:
                    return doPostMakePaymentMessageMB(EX_PAYMENT?.EXTRA_PAYMENT_DATA)
                default:
                    const newWindow = window.open(`${deepLink}`, '_blank', 'noopener,noreferrer');
                    if (newWindow) newWindow.opener = null
                    break
            }
        }
    }
    //func appointment
    const gotoAppointment = () => {
        history.push('/lich-hen?tab=1')
    }
    const gotoServiceUser = () => {
        history.push('/lich-hen?tab=2')
    }
    const goBackHome = () => {
        history.push('/homepage')
    }
    const onCheckStatus = () => {
        switch (data.orderStatus) {
            case "PENDING":
                return <>
                    <XButton
                        onClick={handleCancelOrder}
                        title='H???y thanh to??n'
                        className={style.section_status_btn}
                        style={{ backgroundColor: 'var(--pink-momo)' }}
                    />
                </>
            case "PAID":
                return <>
                    <p style={{ color: "var(--green)" }} className={style.section_status_title}>
                        {action ? 'Thanh to??n v?? ?????t h???n th??nh c??ng' : 'Thanh to??n th??nh c??ng'}
                    </p>
                    {
                        action ?
                            <div className={style.section_status_btn_cnt}>
                                <XButton
                                    style={{ width: 'calc(50% - 6px)' }}
                                    className={style.section_status_btn}
                                    title='Xem l???ch h???n'
                                    onClick={gotoAppointment}
                                />
                                <XButton
                                    style={{ width: 'calc(50% - 6px)' }}
                                    className={style.section_status_btn}
                                    title='V??? trang ch???'
                                    onClick={goBackHome}
                                />
                            </div>
                            :
                            servicesOrder?.length > 0 ?
                                <div className={style.section_status_btn_cnt}>
                                    <XButton
                                        style={{ width: 'calc(50% - 6px)' }}
                                        className={style.section_status_btn}
                                        title='?????t h???n ngay'
                                        onClick={gotoServiceUser}
                                    />
                                    <XButton
                                        style={{ width: 'calc(50% - 6px)' }}
                                        className={style.section_status_btn}
                                        title='V??? trang ch???'
                                        onClick={goBackHome}
                                    />
                                </div>
                                :
                                <XButton
                                    onClick={goBackHome}
                                    title='V??? trang ch???'
                                    className={style.section_status_btn}
                                />
                    }
                </>
            case "CANCELED":
                return <>
                    <p className={style.section_status_title}>
                        ???? h???y thanh to??n
                    </p>
                    <XButton
                        onClick={goBackHome}
                        title='V??? trang ch???'
                        className={style.section_status_btn}
                    />
                </>
            case "CANCELED_BY_USER":
                return <>
                    <p className={style.section_status_title}>
                        ???? h???y thanh to??n
                    </p>
                    <XButton
                        onClick={goBackHome}
                        title='V??? trang ch???'
                        className={style.section_status_btn}
                    />
                </>
            default:
                break
        }
    }
    return (
        <>
            <UserPaymentInfo disableEdit disableAddress />
            <div className={style.section_org}>
                <div className={style.org_img}>
                    <img src={organization?.image_url ?? img.imgDefault} onError={(e) => onErrorImg(e)} alt="" />
                </div>
                <div className={style.org_right}>
                    <p className={style.org_name}>{organization?.name}</p>
                    <p className={style.org_address}>{organization?.full_address}</p>
                </div>
            </div>
            <ul className={style.order_list}>
                {
                    items.map((item: ICart, index: number) => (
                        <li key={index} className={style.order_list_item}>
                            <div className={style.order_item}>
                                <div className={style.org_img}>
                                    <img
                                        src={item.cart_item?.image_url ?? organization?.image_url ?? img.imgDefault}
                                        onError={(e) => onErrorImg(e)}
                                        alt=""
                                    />
                                </div>
                                <div className={style.org_right}>
                                    <p className={style.org_name}>{item.name}</p>
                                    <div className={style.order_item_price}>
                                        <div className={style.price}>
                                            {
                                                (item.discount && item.price_discount) ?
                                                    <>
                                                        <span style={{ color: "var(--text-orange)" }} >
                                                            {
                                                                item.quantity === 1 ? formatPrice(item.price_discount) :
                                                                    (
                                                                        item.discount.discount_type === "FINAL_PRICE"
                                                                            ?
                                                                            formatPrice(item.price_discount * item.quantity)
                                                                            :
                                                                            formatPrice((item.price * (item.quantity - 1)) + item.price_discount)
                                                                    )
                                                            }??
                                                        </span>
                                                        <span>{formatPrice(item.price * item.quantity)}??</span>
                                                    </>
                                                    :
                                                    <span>{" "}{formatPrice(item.price)}</span>
                                            }
                                        </div>
                                        <div className={style.quantity}>
                                            x{item.quantity}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))
                }
            </ul>
            <div className={style.section_guide}>
                <span>B???n c???n ?????t h???n sau khi thanh to??n th??nh c??ng nh??! C???a h??ng s??? li??n h??? v???i b???n s???m nh???t c?? th???</span>
            </div>
            <div className={style.section_bottom}>
                <div className={style.bottom_bill}>
                    <div className={style.bottom_bill_row}>
                        <span className={style.row_label}>T???ng ti???n</span>
                        <span className={style.row_value}>{formatPrice(data.res?.amount)}??</span>
                    </div>
                    {data.res?.discount_value > 0 &&
                        <div className={style.bottom_bill_row}>
                            <span className={style.row_label}>Gi???m gi??</span>
                            <span className={style.row_value}>-{formatPrice(data.res?.discount_value)}??</span>
                        </div>
                    }
                </div>
                <div className={style.bottom_pay}>
                    <div className={style.bottom_pay_left}>
                        <span className={style.bottom_pay_left_label}>T???ng thanh to??n</span>
                        <span className={style.bottom_pay_left_value}>
                            {formatPrice(data.res?.payment_gateway?.amount)}
                        </span>
                    </div>
                    {
                        IS_MB && data.orderStatus === 'PENDING' &&
                        <div className={style.bottom_pay_right}>
                            <XButton
                                title='Thanh to??n'
                                onClick={openDeepLinkPayment}
                                className={style.bottom_pay_right_btn}
                            />
                        </div>
                    }
                </div>
            </div>
            {
                data.orderStatus !== 'PENDING' &&
                <div className={style.section_status_modal}>
                    <div className={style.section_status}>
                        {onCheckStatus()}
                    </div>
                </div>
            }
        </>
    );
}

export default PaymentInfo;