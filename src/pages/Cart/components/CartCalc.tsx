import { XButton } from 'components/Layout';
import icon from 'constants/icon';
import { useCartReducer, useNoti, useVoucher } from 'hooks';
import { IDiscountPar, IOrganization } from 'interface';
import IStore from 'interface/IStore';
import React, { useContext, useEffect, useState } from 'react';
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

interface CartCalcType {
    order: PostOrderType,
    orgChoose: IOrganization
}

const popupInit = {
    content: '', open: false, child: <></>
}

export function CartCalc(props: CartCalcType) {
    const {t} = useContext(AppContext)
    const { order, orgChoose } = props
    const PLAT_FORM = EXTRA_FLAT_FORM()
    const [openVc, setOpenVc] = useState(false)
    const {firstLoad, resultLoad, noti} = useNoti()
    const history = useHistory()
    const [popup, setPopup] = useState(popupInit)
    const { USER } = useSelector((state: IStore) => state.USER)
    const { cartAmount, cartAmountDiscount, VOUCHER_APPLY, cartList } = useSelector((state: IStore) => state.carts)
    const {  services_id, products_id, combos_id, outDiscounts, products } = useCartReducer()
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

    const onPostOrder = async () => {
        const param: PostOrderType = {
            ...order,
            products: products_id,
            treatment_combo: combos_id,
            services: services_id,
            coupon_code: listCouponCode
        }
        if (finalAmount - totalVoucherValue < 1000) {
            return setPopup({ ...popupInit, open: true, content: 'Gi?? tr??? ????n h??ng t???i thi???u 1.000??' })
        }
        if (products_id?.length > 0 && !order.user_address_id) {
            return setPopup({
                content: 'Vui l??ng th??m ?????a ch??? giao h??ng!',
                open: true,
                child: <XButton title='Th??m m???i' onClick={() => history.push('/tai-khoan/dia-chi-giao-hang')} />
            })
        }
        if (!order.payment_method_id) {
            return setPopup({ ...popupInit, open: true, content: 'Vui l??ng ch???n ph????ng th???c thanh to??n' })
        }
        if (PLAT_FORM === PLF_TYPE.MB && !checkPhoneValid(USER?.telephone)) {
            return setPopup({
                content: 'Vui l??ng th??m s??? ??i???n tho???i ????? ti???p t???c thanh to??n!',
                open: true,
                child: <XButton title='Th??m m???i' onClick={() => history.push('/otp-form')} />
            })
        }
        firstLoad()
        tracking.PAY_CONFIRM_CLICK(orgChoose.id, formatProductList(products))
        try {
            const res = await orderApi.postOrder(orgChoose.id, param)
            resultLoad('')
            const state_payment = await { ...res.data.context, FINAL_AMOUNT: finalAmount - totalVoucherValue };
            if (state_payment.status !== 'PENDING') {
                return setPopup({ ...popupInit, open: true, content: 'T???o ????n h??ng th???t b???i!' })
            }
            history.push({
                pathname: `/trang-thai-don-hang/`,
                search: state_payment.payment_gateway.transaction_uuid,
                state: { state_payment },
            });
        } catch (error) {
            resultLoad('')
            return setPopup({ ...popupInit, open: true, content: 'T???o ????n h??ng th???t b???i!' })
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
            <div className={style.calc_body}>
                <div className={style.calc_body_row}>
                    <span className={style.calc_body_row_label}>{t('pm.temporary')}</span>
                    <span className={style.calc_body_row_price}>{formatPrice(cartAmount)}??</span>
                </div>
                {
                    cartAmountDiscount &&
                    <div className={style.calc_body_row}>
                        <span className={style.calc_body_row_label}>{t('detail_item.discount')}</span>
                        <span className={style.calc_body_row_price}>-{formatPrice(cartAmountDiscount)}??</span>
                    </div>
                }
                {
                    vouchersFinal?.map((item: IDiscountPar) => (
                        <div key={item.id} className={style.calc_body_row}>
                            <span className={style.calc_body_row_label}>{item.description}</span>
                            <span className={style.calc_body_row_price}>-{formatPrice(item.discount_value)}??</span>
                        </div>
                    ))
                }
            </div>
            <div className={style.checkout_out}>
                <div className={style.checkout_out_amount}>
                    <span className={style.checkout_out_amount_label}>{t('pm.total_payment')}</span>
                    <span className={style.checkout_out_amount_price}>
                        {formatPrice(finalAmount - totalVoucherValue)}??
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
                open={popup.open}
                setOpen={() => setPopup(popupInit)}
                title='Th??ng b??o'
                content={popup.content}
                children={popup.child}
            />
        </>
    );
}