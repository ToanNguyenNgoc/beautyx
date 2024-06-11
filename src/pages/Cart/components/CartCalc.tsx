import { BTXSelectPoint, XButton } from 'components/Layout';
import icon from 'constants/icon';
import { useCartReducer, useDeviceMobile, useNoti, useUserAddress, useVoucher } from 'hooks';
import { IDiscountPar, IOrganization } from 'interface';
import IStore from 'interface/IStore';
import React, { Dispatch, useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTotal } from 'redux/cart';
import { PostOrderType } from '../index'
import formatPrice from 'utils/formatPrice';
import style from '../cart.module.css'
import { InputVoucher } from 'features/InputVoucher';
import { useHistory } from 'react-router-dom';
import { EXTRA_FLAT_FORM } from 'api/extraFlatForm';
import { checkPhoneValid } from 'utils';
import { PopupNotification } from 'components/Notification';
import { orderApi } from 'api/orderApi';
import tracking from 'api/trackApi';
import formatProductList from 'utils/tracking';
import { PLF_TYPE } from 'constants/plat-form';
import { AppContext } from 'context/AppProvider';
import { BTX, PAY_ON_BTX, VIETTELPAY } from 'common';

interface CartCalcType {
    order: PostOrderType,
    setOrder: Dispatch<React.SetStateAction<PostOrderType>>,
    orgChoose: IOrganization
}

export function CartCalc(props: CartCalcType) {
    const { t } = useContext(AppContext) as any
    const { order, orgChoose, setOrder } = props
    const PLAT_FORM = EXTRA_FLAT_FORM()
    const [openVc, setOpenVc] = useState(false)
    const { addressDefault } = useUserAddress()
    const { firstLoad, resultLoad, noti, onCloseNoti } = useNoti()
    const history = useHistory()
    const { USER } = useSelector((state: IStore) => state.USER)
    const { cartAmount, cartAmountDiscount, VOUCHER_APPLY, cartList } = useSelector((state: IStore) => state.carts)
    const { services_id, products_id, combos_id, outDiscounts, products } = useCartReducer()
    let finalAmount = cartAmount - cartAmountDiscount

    const { vouchersFinal, totalVoucherValue } = useVoucher(finalAmount, VOUCHER_APPLY, services_id)
    const dispatch = useDispatch()
    useEffect(() => {
        let mount = true
        if (mount) {
            dispatch(getTotal(USER?.id));
        }
        return () => { mount = false }
    }, [dispatch, cartList, USER, VOUCHER_APPLY]);
    const listCouponCode = outDiscounts
        .map((i: IDiscountPar) => i.coupon_code)
        .concat(vouchersFinal.map(i => i.coupon_code))
        .filter(Boolean)
    let TOTAL_PAYMENT = finalAmount - totalVoucherValue
    if (typeof order?.point == 'number' && order.point > 0) {
        TOTAL_PAYMENT = TOTAL_PAYMENT - order.point
    }
    const withOptionalBTXPoint = async (param: PostOrderType) => {
        if (!orgChoose) {
            return resultLoad('Vui lòng chọn dịch vụ/ sản phẩm bạn muốn đặt hàng !')
        }
        if (TOTAL_PAYMENT < 1000) {
            return resultLoad('Giá trị đơn hàng tối thiểu 1.000đ')
        }
        if (param.payment_method_id === PAY_ON_BTX.id && TOTAL_PAYMENT < 5000) {
            return resultLoad('Với phương thức Payon giá trị đơn hàng tối thiểu 5.000đ')
        }
        if (products_id?.length > 0 && !addressDefault) {
            return resultLoad(
                'Vui lòng thêm địa chỉ giao hàng!',
                <XButton title='Thêm mới' onClick={() => history.push('/tai-khoan/dia-chi-giao-hang')} />
            )
        }
        if (!param.payment_method_id) {
            return resultLoad('Vui lòng chọn phương thức thanh toán')
        }
        if (PLAT_FORM === PLF_TYPE.MB && !checkPhoneValid(USER?.telephone)) {
            return resultLoad(
                'Vui lòng thêm số điện thoại để tiếp tục thanh toán!',
                <XButton title='Thêm mới' onClick={() => history.push('/otp-form')} />
            )
        }
        firstLoad()
        tracking.PAY_CONFIRM_CLICK(orgChoose.id, formatProductList(products))
        try {
            const res = await orderApi.postOrder(orgChoose.id, param)
            const state_payment = await { ...res.data.context, FINAL_AMOUNT: TOTAL_PAYMENT };
            if (state_payment.status !== 'PENDING') {
                return resultLoad('Tạo đơn hàng thất bại!')
            }
            if (res?.data?.context?.payment_method?.name_key === VIETTELPAY.name_key) {
                return onRedirectVIETTELPAY(
                    res?.data?.context
                );
            }
            history.push({
                pathname: `/trang-thai-don-hang/`,
                search: state_payment.payment_gateway?.transaction_uuid,
                state: { state_payment },
            });
            resultLoad('')
        } catch (error) {
            return resultLoad('Tạo đơn hàng thất bại!')
        }
    }
    const is_mobile = useDeviceMobile()
    function onRedirectVIETTELPAY(res: any) {
        if (
            res?.payment_gateway?.extra_data?.payUrl
        ) {
            if (is_mobile) {
                window.location.assign(`${res?.payment_gateway?.extra_data?.deepLink}`);
            } else {
                window.location.assign(
                    `${res?.payment_gateway?.extra_data?.payUrl}`
                );
            }
        } else {
            return resultLoad("Tạo đơn hàng thất bại!");
        }
    }

    const withFullBTXPoint = async (param: PostOrderType) => {
        param.payment_method_id = BTX.id
        if (products_id?.length > 0 && !addressDefault) {
            return resultLoad(
                'Vui lòng thêm địa chỉ giao hàng!',
                <XButton title='Thêm mới' onClick={() => history.push('/tai-khoan/dia-chi-giao-hang')} />
            )
        }
        if (PLAT_FORM === PLF_TYPE.MB && !checkPhoneValid(USER?.telephone)) {
            return resultLoad(
                'Vui lòng thêm số điện thoại để tiếp tục thanh toán!',
                <XButton title='Thêm mới' onClick={() => history.push('/otp-form')} />
            )
        }
        firstLoad()
        tracking.PAY_CONFIRM_CLICK(orgChoose.id, formatProductList(products))
        try {
            const res = await orderApi.postOrder(orgChoose.id, param)
            resultLoad('')
            const state_payment = await { ...res.data.context, FINAL_AMOUNT: TOTAL_PAYMENT };
            if (state_payment.status !== 'PAID') {
                return resultLoad('Tạo đơn hàng thất bại!')
            }
            history.push({
                pathname: `/trang-thai-don-hang/`,
                search: state_payment.payment_gateway?.transaction_uuid,
                state: { state_payment },
            });
        } catch (error) {
            return resultLoad('Tạo đơn hàng thất bại!')
        }
    }
    const onPostOrder = async () => {
        let param: PostOrderType = {
            ...order,
            user_address_id: addressDefault?.id,
            products: products_id,
            treatment_combo: combos_id,
            services: services_id,
            coupon_code: listCouponCode,
        }
        if (Number(order.point) > 0) {
            param.payment_method_second_id = BTX.id
        }
        if (TOTAL_PAYMENT === 0 && order.point) {
            withFullBTXPoint(param)
        } else {
            withOptionalBTXPoint(param)
        }
    }


    return (
        <>
            <XButton
                title={t('pm.enter_coupon_code')}
                icon={icon.cardDiscountOrange}
                onClick={() => setOpenVc(true)}
                iconSize={14}
                className={style.open_voucher_bnt}
            />
            {/* <BTXSelectPoint
                totalOrigin={cartAmount - cartAmountDiscount}
                className={style.calc_pont}
                valuePoint={order.point}
                onChangePoint={(e) => setOrder({ ...order, point: e })}
            /> */}
            <div className={style.calc_body}>
                <div className={style.calc_body_row}>
                    <span className={style.calc_body_row_label}>{t('pm.temporary')}</span>
                    <span className={style.calc_body_row_price}>{formatPrice(cartAmount)}đ</span>
                </div>
                {
                    cartAmountDiscount &&
                    <div className={style.calc_body_row}>
                        <span className={style.calc_body_row_label}>{t('detail_item.discount')}</span>
                        <span className={style.calc_body_row_price}>-{formatPrice(cartAmountDiscount)}đ</span>
                    </div>
                }
                {
                    vouchersFinal?.map((item: IDiscountPar) => (
                        <div key={item.id} className={style.calc_body_row}>
                            <span className={style.calc_body_row_label}>{item.description}</span>
                            <span className={style.calc_body_row_price}>-{formatPrice(item.discount_value)}đ</span>
                        </div>
                    ))
                }
                {
                    Number(order?.point) > 0 &&
                    <div className={style.calc_body_row}>
                        <span className={style.calc_body_row_label}>Tiết kiệm</span>
                        <span className={style.calc_body_row_price}>-{formatPrice(order?.point)}đ</span>
                    </div>
                }
            </div>
            <div className={style.checkout_out}>
                <div className={style.checkout_out_amount}>
                    <span className={style.checkout_out_amount_label}>{t('pm.total_payment')}</span>
                    <span className={style.checkout_out_amount_price}>
                        {formatPrice(TOTAL_PAYMENT)}đ
                    </span>
                </div>
                <XButton
                    className={style.checkout_out_amount_btn}
                    title={t('cart.checkout')}
                    onClick={onPostOrder}
                    loading={noti.load}
                />
            </div>
            <InputVoucher
                open={openVc}
                setOpen={setOpenVc}
                services_id={services_id.map(i => i.id)}
                products_id={products_id.map(i => i.id)}
                outDiscounts={outDiscounts ?? []}
                organization={orgChoose}
                cartAmount={cartAmount - cartAmountDiscount}
            />
            <PopupNotification
                open={noti.openAlert}
                setOpen={onCloseNoti}
                title='Thông báo'
                content={noti.message}
                children={noti.element}
            />
        </>
    );
}