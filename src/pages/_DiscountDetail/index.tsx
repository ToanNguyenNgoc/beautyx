import LoadDetail from 'components/LoadingSketion/LoadDetail';
import { useDeviceMobile, useFavorite } from 'hooks';
import HeadOrg from 'pages/MerchantDetail/components/HeadOrg';
import { DetailProp } from 'pages/_SerProCoDetail/detail.interface';
import React, { useContext, useState } from 'react';
import { useDiscountDetail } from './useDiscountDetail';
import style from '../_SerProCoDetail/detail.module.css'
import { Container, Drawer, Rating } from '@mui/material';
import Slider from 'react-slick';
import { onErrorImg } from 'utils';
import formatPrice from 'utils/formatPrice';
import icon from 'constants/icon';
import { AlertSnack, OpenApp, ShareSocial, XButton } from 'components/Layout';
import { DetailDesc, DetailOrgCard, DetailRecommend } from 'pages/_SerProCoDetail';
import Comment from 'components/Comment';
import { IDiscountPar, IOrganization } from 'interface';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import IStore from 'interface/IStore';
import { PopupMessage } from 'components/Notification';
import { formatAddCart } from 'utils/cart/formatAddCart';
import { addCart } from 'redux/cart';
import GoogleTagPush, { GoogleTagEvents } from 'utils/dataLayer';
import tracking from 'api/trackApi'
import { clearAllServices } from 'redux/booking';
import { AppContext } from 'context/AppProvider';

function DiscountDetail() {
    const IS_MB = useDeviceMobile()
    const { detail, org, discount, typeItemProps } = useDiscountDetail()
    const location = useLocation()
    const history = useHistory()
    //display special price
    let specialPrice = discount?.discount_value
    if (discount?.discount_type === 'PRODUCT') {
        specialPrice = detail?.price ?? detail?.retail_price - discount?.discount_value
    }
    //---

    // console.log(discount)
    const DETAIL: DetailProp = {
        name: detail?.service_name ?? detail?.product_name ?? '',
        type: typeItemProps?.type ?? 'SERVICE',
        SPECIAL_PRICE: specialPrice,
        PRICE: detail?.price ?? detail?.retail_price,
        ...detail
    }
    const PERCENT = Math.ceil(100 - DETAIL.SPECIAL_PRICE / DETAIL.PRICE * 100)
    const { favoriteSt, onToggleFavorite } = useFavorite({
        id: DETAIL.id,
        org_id: org?.id,
        type: typeItemProps?.type === 'SERVICE' ? 'SERVICE' : 'PRODUCT',
        count: DETAIL.favorites_count,
        favorite: DETAIL.is_favorite
    })
    //----
    const settings = {
        dots: false,
        arrows: false,
        speed: 900,
        slidesToShow: 1,
        slidesToScroll: 1,
        swipe: true,
    }
    const onNavigateCateList = () => {
        if (org?.id) {
            history.push(`/cua-hang/${org.subdomain}/dich-vu?cate_id=${DETAIL.category?.id}`)
        }
    }

    return (
        (detail && org && discount) ?
            <>
                {IS_MB && <HeadOrg onBackFunc={() => history.goBack()} org={org} />}
                <Container>
                    <div className={style.wrapper} >
                        <div className={style.container}>
                            <div className={style.container_head}>
                                <div className={style.container_head_left}>
                                    <div className={style.container_head_img_slide}>
                                        <Slider
                                            {...settings}
                                            className={style.slide}
                                        >
                                            {
                                                DETAIL.video_url &&
                                                <div className={style.media_item_video}>
                                                    <video
                                                        className={style.media_item_bg}
                                                        src={DETAIL.video_url}>

                                                    </video>
                                                    <video
                                                        className={style.video_container}
                                                        loop
                                                        controls
                                                        webkit-playsinline="webkit-playsinline"
                                                        playsInline={true}
                                                    >
                                                        <source src={DETAIL.video_url} />
                                                    </video>
                                                </div>
                                            }
                                            {
                                                [DETAIL.image_url].map(i => (
                                                    <div
                                                        style={IS_MB ? {
                                                            height: `414px`
                                                        } : {}}
                                                        key={i} className={style.media_item_img}
                                                    >
                                                        <img src={i ?? org.image_url} onError={(e) => onErrorImg(e)} alt="" />
                                                    </div>
                                                ))
                                            }
                                        </Slider>
                                    </div>
                                    <div className={style.container_head_img_thumb}>
                                        {!IS_MB && <ShareSocial url={location.pathname} />}
                                    </div>
                                </div>
                                <div className={style.container_head_right}>
                                    <div>
                                        {
                                            DETAIL.category &&
                                            <div className={style.detail_cate}>
                                                Lo???i: <span onClick={onNavigateCateList}>{DETAIL.category?.name}</span>
                                            </div>
                                        }
                                        <span className={style.detail_name}>{DETAIL.name}</span>
                                        <div className={style.duration}>
                                            {
                                                DETAIL.duration > 0 &&
                                                <div className={style.duration_item}>
                                                    <img src={icon.clockGray} className={style.duration_item_icon} alt="" />
                                                    <span className={style.duration_item_text}>{DETAIL.duration} ph??t</span>
                                                </div>
                                            }
                                        </div>
                                        <div className={style.detail_buy}>
                                            <div className={style.detail_price}>
                                                <div className={style.detail_price_left}>
                                                    {
                                                        DETAIL.SPECIAL_PRICE > 0 &&
                                                        <span className={style.price_percent}>
                                                            -{PERCENT}%
                                                        </span>
                                                    }
                                                    <div className={style.price}>
                                                        {DETAIL.SPECIAL_PRICE > 0 && <span>{formatPrice(DETAIL.SPECIAL_PRICE)}??</span>}
                                                        <span>{formatPrice(DETAIL.PRICE)}??</span>
                                                    </div>
                                                </div>
                                                <div className={style.detail_price_right}>
                                                    <XButton
                                                        className={style.right_btn}
                                                        icon={favoriteSt.is_favorite ? icon.heart : icon.unHeart}
                                                        iconSize={20}
                                                        onClick={onToggleFavorite}
                                                    />
                                                </div>
                                            </div>
                                            <div className={style.detail_rate}>
                                                <div className={style.detail_rate_item}>
                                                    <Rating name="read-only" value={5} readOnly />
                                                </div>
                                                <div className={style.detail_rate_item}>
                                                    <span className={style.detail_rate_item_count}>{favoriteSt.favorite_count}</span>
                                                    <img src={icon.heart} className={style.detail_rate_icon} alt="" />
                                                </div>
                                                {
                                                    DETAIL.bought_count &&
                                                    <div className={style.detail_rate_item}>
                                                        <span className={style.detail_rate_item_count}>
                                                            {DETAIL.bought_count} ???? b??n
                                                        </span>
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                        {!IS_MB && <DetailOrgCard org={org} />}
                                    </div>
                                    {
                                        !IS_MB &&
                                        <DetailQuantity discount={discount} org={org} detail={DETAIL} />
                                    }
                                </div>
                            </div>
                        </div>
                        <DetailDesc detail={DETAIL} org={org} />
                        {
                            IS_MB &&
                            <div className={style.org_card_mb}>
                                <DetailOrgCard org={org} />
                            </div>
                        }
                        <DetailRecommend detail={DETAIL} org={org} />
                        <div className={style.comment_cnt}>
                            <Comment
                                org_id={org?.id}
                                commentable_id={DETAIL.id}
                                commentable_type={DETAIL.type}
                            />
                        </div>
                        {
                            IS_MB &&
                            <DetailBottom PERCENT={PERCENT} discount={discount} org={org} detail={DETAIL} />
                        }
                    </div>
                </Container>
                <OpenApp
                    type='discount'
                    id={discount.id}
                    item_id={DETAIL.id}
                    org_id={org?.id}
                />
            </>
            :
            <LoadDetail />
    );
}

export default DiscountDetail;

interface DetailQuantityProps {
    discount: IDiscountPar,
    org: IOrganization,
    detail: DetailProp,
    draType?: string
}
const DetailBottom = (
    { detail, org, discount, PERCENT }:
        { detail: DetailProp, org: IOrganization, discount: IDiscountPar, PERCENT: number }
) => {
    const {t} = useContext(AppContext)
    const [dra, setDra] = useState({
        open: false, type: ''
    })
    return (
        <div className={style.bottom}>
            <XButton
                title={detail.type === 'SERVICE' ? t('pm.booking_now') : t('cart.payment_now')}
                onClick={() => setDra({ open: true, type: 'NOW' })}
            />
            <XButton
                title={t('pr.add_to_cart')}
                onClick={() => setDra({ open: true, type: 'ADD_CART' })}
            />
            <Drawer anchor='bottom' open={dra.open} onClose={() => setDra({ open: false, type: '' })} >
                <div className={style.bottom_wrapper}>
                    <div className={style.bottom_detail}>
                        <img src={detail.image_url} className={style.bottom_detail_img} alt="" />
                        <div className={style.bottom_detail_info}>
                            <p className={detail.name}>{detail.name}</p>
                            <div className={style.duration}>
                                {
                                    detail.duration > 0 &&
                                    <div className={style.duration_item}>
                                        <img src={icon.clockGray} className={style.duration_item_icon} alt="" />
                                        <span className={style.duration_item_text}>{detail.duration} ph??t</span>
                                    </div>
                                }
                            </div>
                            <div className={style.detail_price_left}>
                                {
                                    detail.SPECIAL_PRICE > 0 &&
                                    <span className={style.price_percent}>
                                        -{PERCENT}%
                                    </span>
                                }
                                <div className={style.price}>
                                    {detail.SPECIAL_PRICE > 0 && <span>{formatPrice(detail.SPECIAL_PRICE)}??</span>}
                                    <span>{formatPrice(detail.PRICE)}??</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <DetailQuantity
                        draType={dra.type} org={org} detail={detail}
                        discount={discount}
                    />
                </div>
            </Drawer>
        </div>
    )
}

const DetailQuantity = (props: DetailQuantityProps) => {
    const {t} = useContext(AppContext)
    const { discount, org, detail, draType } = props
    const [quantity, setQuantity] = useState(1)
    const [open, setOpen] = useState(false)
    const dispatch = useDispatch()
    const { USER } = useSelector((state: IStore) => state.USER)
    const history = useHistory()
    const onDescQuantity = () => quantity > 1 && setQuantity(quantity - 1)
    const values = formatAddCart(
        detail,
        org,
        detail.type,
        quantity,
        detail.PRICE,
        discount.user_available_purchase_count > 0 ? discount : null
    );
    const handleAddCart = () => {
        if (!USER) return history.push('/sign-in?1')
        dispatch(addCart({
            ...values,
            user_id: USER.id
        }));
        GoogleTagPush(GoogleTagEvents.ADD_TO_CART);
        tracking.ADD_CART_CLICK(
            values.org_id,
            values.id,
            values.price,
            values.quantity
        );
        setOpen(true)
    }
    const onBookingNow = () => {
        const TYPE = "BOOK_NOW";
        const service = {
            ...detail,
            SPECIAL_PRICE:0,
            discount: values.discount
        };
        const services = [{ service, quantity: quantity }];
        tracking.ADD_CART_CLICK(values.org_id, values.id, values.price, values.quantity)
        GoogleTagPush(GoogleTagEvents.ADD_TO_CART);
        history.push({
            pathname: "/dat-hen",
            state: { org, services, TYPE },
        });
        dispatch(clearAllServices());
    }
    return (
        <div>
            {
                discount.discount_type === 'PRODUCT' && quantity > 1 &&
                <p className={style.price_warning}>
                    Gi?? d???ch v??? ???? thay ?????i v?? b???n ch???n nhi???u h??n s??? l?????ng ???????c ??p d???ng m??
                </p>
            }
            <div className={style.detail_cart}>
                <div className={style.detail_quantity}>
                    <span className={style.detail_quantity_title}>{t('pr.quantity')}</span>
                    <div className={style.detail_quantity_calc}>
                        <XButton
                            title='-'
                            className={style.detail_quantity_btn}
                            onClick={onDescQuantity}
                        />
                        <span className={style.quantity}>{quantity}</span>
                        <XButton
                            title='+'
                            className={style.detail_quantity_btn}
                            onClick={() => setQuantity(quantity + 1)}
                        />
                    </div>
                </div>
                <div className={style.add_cart}>
                    {detail.type === 'SERVICE' &&
                        <XButton
                            style={draType === "NOW" ? { display: 'flex' } : {}}
                            title={t('pm.booking_now')}
                            className={style.add_cart_btn}
                            onClick={onBookingNow}
                        />
                    }
                    <XButton
                        style={draType === "ADD_CART" ? { display: 'flex' } : {}}
                        icon={icon.cartWhiteBold}
                        iconSize={15}
                        title={t('pr.add_to_cart')}
                        className={style.add_cart_btn}
                        onClick={handleAddCart}
                    />
                </div>
                {
                    discount?.user_available_purchase_count > 0 ?
                        <PopupMessage
                            iconLabel={detail.image_url}
                            content={`???? th??m ${detail.name} v??o gi??? h??ng`}
                            open={open}
                            onClose={() => setOpen(false)}
                            autoHide={true}
                        />
                        :
                        <AlertSnack
                            open={open}
                            onClose={() => setOpen(false)}
                            status="WARNING"
                            title={`B???n ???? h???t l?????t mua v???i gi?? khuy???n m???i`}
                        />
                }
            </div>
        </div>
    )
}