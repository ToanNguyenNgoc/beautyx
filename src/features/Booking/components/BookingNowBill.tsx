/* eslint-disable react-hooks/exhaustive-deps */
import icon from 'constants/icon';
import React, { Dispatch, useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import formatPrice from 'utils/formatPrice';
import { DISCOUNT_TYPE } from 'utils/formatRouterLink/fileType';
import { IOrganization } from 'interface/organization';
import { useSelector } from 'react-redux';
import { IDiscountPar } from 'interface/discount';
import style from '../booking.module.css'
import { BTXSelectPoint, XButton } from 'components/Layout';
import { AppContext } from 'context/AppProvider';
import { useVoucher } from 'hooks';
import { InputVoucher } from 'features/InputVoucher';

interface BookingNowBillProps {
    org: IOrganization,
    setFinalAmount: (amount: number) => void,
    setPoint: Dispatch<React.SetStateAction<number>>,
    point?: number
}

function BookingNowBill(props: BookingNowBillProps) {
    const { setFinalAmount, point = 0, setPoint } = props
    const { t } = useContext(AppContext) as any
    const { VOUCHER_APPLY } = useSelector((state: any) => state.carts);
    const { org } = props;
    const location: any = useLocation();
    const [openVc, setOpenVc] = useState(false)
    const services = location.state?.services ?? [];
    const services_id = services?.map((item: any) => item.service.id) ?? []
    const outDiscounts = services.map((item: any) => item?.service?.discount).filter(Boolean)
    let { total } = services?.reduce(
        (cartTotal: any, cartItem: any) => {
            const { quantity, service } = cartItem;
            const priceBuy = service.SPECIAL_PRICE > 0 ? service.SPECIAL_PRICE : service.price
            const itemTotal = priceBuy * quantity;
            cartTotal.total += itemTotal;
            return cartTotal;
        },
        {
            total: 0
        }
    );


    const discounts = services
        .map((item: any) => (
            item.service?.discount?.discount_type === DISCOUNT_TYPE.FINAL_PRICE.key ?
                item.service.discount?.discount_value * item.quantity
                :
                item.service.discount?.discount_value + (item.service.PRICE * item.quantity - 1)
        ))
        .filter(Boolean);


    const totalDiscounts = discounts.length > 0 && discounts.reduce((cur: any, pre: any) => cur + pre);
    const items = services.map((i: any) => {
        return {
            id: i.service.id,
            quantity: i.quantity
        }
    })
    const finalAmount = total - totalDiscounts
    const { vouchersFinal, totalVoucherValue } = useVoucher(finalAmount, VOUCHER_APPLY, items)


    let TOTAL_AMOUNT = finalAmount - totalVoucherValue
    if (point > 0) {
        TOTAL_AMOUNT = TOTAL_AMOUNT - point
    }
    useEffect(() => {
        let mount = true
        if (mount) { setFinalAmount(TOTAL_AMOUNT) }
        return () => { mount = false }
    }, [finalAmount, totalVoucherValue, point])

    return (
        <>
            <div className={style.open_voucher}>
                <XButton
                    className={style.open_voucher_btn}
                    onClick={() => setOpenVc(true)}
                    title={t('pm.enter_coupon_code')}
                    iconSize={16}
                    icon={icon.cardDiscountOrange}
                />
            </div>
            <BTXSelectPoint
                className={style.booking_cnt_bot_point}
                totalOrigin={finalAmount - totalVoucherValue}
                valuePoint={point}
                onChangePoint={(e) => setPoint(Number(e))}
            />
            <div className={style.booking_cnt_bot_bill}>
                <div className={style.booking_calc_item}>
                    <span className={style.booking_calc_item_left}>{t('cart.total_payment')}</span>
                    <span className={style.booking_calc_item_right}>{formatPrice(total)}đ</span>
                </div>
                {
                    discounts?.length > 0 &&
                    discounts?.map((item: number, index: number) => (
                        <div key={index} className={style.booking_calc_item}>
                            <span className={style.booking_calc_item_left}>{t('pm.discounts')}</span>
                            <span className={style.booking_calc_item_right}>
                                -{formatPrice(item)}đ
                            </span>
                        </div>
                    ))
                }
                {
                    vouchersFinal.map((item: IDiscountPar, index: number) => (
                        <div key={index} className={style.booking_calc_item}>
                            <span className={style.booking_calc_item_left}>{item.title}</span>
                            <span
                                style={{ color: "var(--text-orange)" }}
                                className={style.booking_calc_item_right}>
                                -{formatPrice(item.discount_value)}đ
                            </span>
                        </div>
                    ))
                }
                {
                    point > 0 &&
                    <div className={style.booking_calc_item}>
                        <span className={style.booking_calc_item_left}>Tiết kiệm</span>
                        <span className={style.booking_calc_item_right}>
                            -{formatPrice(point)}đ
                        </span>
                    </div>
                }
                <div className={style.booking_calc_item}>
                    <span className={style.booking_calc_item_left}>{t('pm.pay')}</span>
                    <span style={{ fontWeight: "700" }} className={style.booking_calc_item_right}>
                        {formatPrice(TOTAL_AMOUNT)}đ
                    </span>
                </div>
            </div>
            <InputVoucher
                outDiscounts={outDiscounts}
                open={openVc}
                setOpen={setOpenVc}
                services_id={services_id}
                products_id={[]}
                organization={org}
                cartAmount={finalAmount}
            />
        </>
    );
}

export default BookingNowBill;