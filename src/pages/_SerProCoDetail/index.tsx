/* eslint-disable react-hooks/exhaustive-deps */
import { useRouteMatch, useHistory, Link, useLocation } from 'react-router-dom';
import { useCartReducer, useDeviceMobile, useFavorite, useGetParamUrl, useSwr } from 'hooks';
import { useContext, useEffect, useRef, useState } from 'react';
import LoadDetail from 'components/LoadingSketion/LoadDetail';
import { DetailProp } from './detail.interface'
import formatPrice, { formatSalePriceService } from 'utils/formatPrice';
import { IDiscountPar, IOrganization } from 'interface';
import API_ROUTE from 'api/_api';
import { BackTopButton, BeautyxCare, FullImage, OpenApp, OrgOffLayout, Seo, SerProItem, ShareSocial, XButton } from 'components/Layout';
import { Container } from '@mui/system';
import { Drawer, Rating } from '@mui/material';
import Slider, { Settings } from 'react-slick';
import icon from 'constants/icon';
import { checkMediaType, clst, extractImageUrls, formatDistance, isPlatformViettel, onErrorImg, scrollTop } from 'utils';
import { formatRouterLinkOrg } from 'utils/formatRouterLink/formatRouter';
import { AUTH_LOCATION } from 'api/authLocation';
import { formatAddCart } from 'utils/cart/formatAddCart';
import { useDispatch, useSelector } from 'react-redux';
import IStore from 'interface/IStore';
import { addCart, getTotal, onClearPrevCartItem, unCheck } from 'redux/cart';
import { PopupMessage } from 'components/Notification';
import { clearAllServices } from 'redux/booking';
import { IS_VOUCHER } from 'utils/cart/checkConditionVoucher';
import { paramsProductsOrg, paramsServicesOrg } from 'params-query'
import Comment from 'components/Comment';
import { postHistoryView } from 'user-behavior';
import GoogleTagPush, { GoogleTagEvents } from 'utils/dataLayer';
import { analytics, logEvent } from '../../firebase';
import { HomeWatched } from 'pages/HomePage/components';
import style from './detail.module.css'
import { useGetByOrgIdCateIdQuery } from 'redux-toolkit-query/hook-detail';
import { AppContext } from 'context/AppProvider';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import API_3RD from 'api/3rd-api';
import { ITrend } from 'pages/Trends/trend.interface';
import { STALE_TIME } from 'config';
import { ChatButton } from "../../pages/Organization/components/ChatButton";
import { IUSER } from 'redux/profile/userSlice';
import { hidden_orgs } from '../../constants';

interface RouteType {
  path: string,
  type: 'SERVICE' | 'PRODUCT' | 'COMBO',
  api: string,
  params: any
}

export const routeType: RouteType[] = [
  {
    path: 'dich-vu', type: 'SERVICE', api: 'services', params: {
      'include': 'category|favorites_count',
      'append': 'is_favorite|rating|bought_count'
    }
  },
  {
    path: 'san-pham', type: 'PRODUCT', api: 'products', params: {
      'append': 'is_favorite|rating',
      'include': 'category|favorites_count'
    }
  },
  {
    path: 'combo-detail', type: 'COMBO', api: 'treatment_combo', params: {
      'include': 'products|services'
    }
  }
]

function SerProCoDetail() {
  const { t } = useContext(AppContext) as any
  const match = useRouteMatch()
  // const paramsOld: any = extraParamsUrl();
  const history = useHistory()
  const LOCATION = AUTH_LOCATION()
  const location = useLocation()
  const IS_MB = useDeviceMobile()
  const currentRoute = match.url.split('/').slice(-1)[0]
  const currentRouteType = routeType.find(i => i.path === currentRoute)
  const paramsArr = useGetParamUrl();
  let redirectPageError = false
  const params = {
    org: parseInt(paramsArr[1]),
    id: parseInt(paramsArr[0])
  }
  if (!params.id || !params.org) redirectPageError = true
  if (!currentRouteType) redirectPageError = true
  const org: IOrganization = useSwr({
    API_URL: API_ROUTE.ORG(params.org),
    enable: params.org,
    params: { 'filter[location]': LOCATION },
    onSuccess: (data) => {
      if (data?.is_momo_ecommerce_enable === false && hidden_orgs.includes(data?.subdomain)) {
        history.replace('/error')
      }
    }
  }).response
  const { response, error } = useSwr({
    API_URL: `/organizations/${params.org}/${currentRouteType?.api}/${params.id}`,
    enable: (params.id && params.org && currentRouteType),
    params: currentRouteType?.params ?? {}
  })
  if (error) redirectPageError = true
  useEffect(() => {
    if (redirectPageError) {
      history.replace('/error')
    }
  }, [redirectPageError])
  const DETAIL: DetailProp = {
    name: response?.service_name ?? response?.name ?? response?.product_name ?? '...',
    type: currentRouteType?.type,
    SPECIAL_PRICE: formatSalePriceService(response?.special_price, response?.special_price_momo),
    PRICE: currentRouteType?.type === 'COMBO' ? response?.use_value : (response?.price ?? response?.retail_price),
    ...response
  }
  const PERCENT = Math.ceil(100 - DETAIL.SPECIAL_PRICE / DETAIL.PRICE * 100)
  const discounts: IDiscountPar[] = []
  const { favoriteSt, onToggleFavorite } = useFavorite({
    id: DETAIL.id,
    type: currentRouteType?.type ?? 'SERVICE',
    count: DETAIL.favorites_count,
    favorite: DETAIL.is_favorite,
    org_id: org?.id
  })
  let onCommerce = false
  if (org?.is_momo_ecommerce_enable && DETAIL?.is_momo_ecommerce_enable) onCommerce = true
  const postAsyncWatched = async () => {
    await postHistoryView({ id: params.id, organization_id: params.org, type: "SERVICE" })
  }
  useEffect(() => {
    postAsyncWatched()
    GoogleTagPush(GoogleTagEvents.PROMOTION_LOAD);
    logEvent(analytics, "detail_service", {
      service: DETAIL.name,
      merchant: org?.name,
    });
  }, [params.id]);
  //---
  // const [openShare, setOpenShare] = useState(false)
  const onNavigateCateList = () => {
    if (org?.id) {
      history.push(`/cua-hang/${org.subdomain}/dich-vu?cate_id=${DETAIL.category?.id}`)
    }
  }
  //----
  const dispatch = useDispatch()
  const { USER } = useSelector((state: IStore) => state.USER)
  const sale_price = DETAIL.SPECIAL_PRICE > 0 ? DETAIL.SPECIAL_PRICE : DETAIL.PRICE
  const values = formatAddCart(DETAIL, org, DETAIL.type, 1, sale_price);
  const onBookingNow = () => {
    if (USER) {
      const services = [{ service: DETAIL, quantity: 1 }];
      const TYPE = "BOOK_NOW";
      history.push({
        pathname: "/dat-hen",
        state: { org, services, TYPE, vouchers: [] },
      })
      dispatch(clearAllServices());
    } else {
      history.push("/sign-in?1")
    }
  }
  const onBuyNow = () => {
    if (USER) {
      dispatch(onClearPrevCartItem())
      const valuesCart = {
        ...values,
        isConfirm: true,
        user_id: USER.id
      }
      dispatch(addCart(valuesCart))
      history.push('/gio-hang')
    } else {
      history.push("/sign-in?1");
    }
  }

  return (
    <>
      {
        response && org ?
          <>
            <Seo title={DETAIL.name} imageCover={DETAIL.image_url} content={DETAIL.description} />
            <Head />
            {
              onCommerce ?
                <Container>
                  <div className={style.wrapper} >
                    <div className={style.container}>
                      <div className={style.container_head}>
                        <div className={style.container_head_left}>
                          <SliderImage detail={DETAIL} org={org} />
                          <div className={style.container_head_img_thumb}>
                            {!IS_MB && <ShareSocial url={location.pathname} />}
                          </div>
                        </div>
                        <div className={style.container_head_right}>
                          <div>
                            {
                              DETAIL.category &&
                              <div className={style.detail_cate}>
                                {t('pr.category')}: <span onClick={onNavigateCateList}>{DETAIL.category?.name}</span>
                              </div>
                            }
                            <span className={style.detail_name}>{DETAIL.name}</span>
                            <div className={style.duration}>
                              {
                                DETAIL.duration > 0 &&
                                <div className={style.duration_item}>
                                  <img src={icon.clockGray} className={style.duration_item_icon} alt="" />
                                  <span className={style.duration_item_text}>{DETAIL.duration} phút</span>
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
                                    {DETAIL.SPECIAL_PRICE > 0 && <span>{formatPrice(DETAIL.SPECIAL_PRICE)}đ</span>}
                                    <span>{formatPrice(DETAIL.PRICE)}đ</span>
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
                                      {DETAIL.bought_count} {t('detail_item.sold')}
                                    </span>
                                  </div>
                                }
                              </div>
                            </div>
                            {!IS_MB && <DetailOrgCard org={org} />}
                          </div>
                          {
                            !IS_MB &&
                            <>
                              {
                                onCommerce ? <DetailQuantity discounts={discounts} org={org} detail={DETAIL} />
                                  :
                                  <p className={style.detail_dis}>
                                    {t('pr.This product/service is not sold online yet')}
                                  </p>
                              }
                            </>
                          }
                        </div>
                      </div>
                    </div>
                    <DetailDesc
                      onBookingNow={DETAIL.type === 'SERVICE' ? onBookingNow : onBuyNow}
                      detail={DETAIL}
                      org={org}
                      PERCENT={PERCENT}
                    />
                    {
                      IS_MB &&
                      <div className={style.org_card_mb}>
                        <DetailOrgCard org={org} />
                      </div>
                    }
                    {
                      DETAIL?.category && org &&
                      <DetailRecommend detail={DETAIL} org={org} />
                    }
                    <div className={style.comment_cnt}>
                      <Comment
                        org_id={org?.id}
                        commentable_id={DETAIL.id}
                        commentable_type={DETAIL.type}
                      />
                      <Comment
                        org_id={org?.id}
                        commentable_id={org?.id}
                        commentable_type="ORGANIZATION"
                        hiddenInput
                      />
                    </div>
                    {
                      IS_MB &&
                      <DetailBottom onCommerce={onCommerce} PERCENT={PERCENT} discounts={discounts} org={org} detail={DETAIL} USER={USER} />
                    }
                  </div>
                </Container>
                :
                <OrgOffLayout />
            }
            <OpenApp
              type={DETAIL.type === "SERVICE" ? 'service' : 'product'}
              id={DETAIL.id}
              item_id={DETAIL.id}
              org_id={org?.id}
            />
            <BackTopButton />
            {USER && !IS_MB && <ChatButton org={org} />}
          </>
          :
          <LoadDetail />
      }

    </>
  );
}

export default SerProCoDetail

export const Head = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const carts = useSelector((state: any) => state.carts);
  const { USER } = useSelector((state: any) => state.USER);
  useEffect(() => {
    dispatch(getTotal(USER?.id));
  }, [dispatch, carts]);
  const refHead = useRef<HTMLDivElement>(null)
  window.addEventListener("scroll", () => {
    const scrolled = window.scrollY;
    if (refHead.current) {
      refHead.current.style.backgroundColor = `rgb(255 255 255 / ${scrolled}%)`
    }
  });
  return (
    <div ref={refHead} className={style.head}>
      <XButton
        onClick={() => history.goBack()}
        icon={icon.chevronLeft}
        style={isPlatformViettel() ? { opacity: 0 } : {}}
      />
      <div className={style.head_right}>
        <XButton
          icon={icon.ShoppingCartSimple}
          onClick={() => USER ? history.push("/gio-hang") : history.push("/sign-in?1")}
        />
        {
          carts.cartQuantity > 0 &&
          <div className={style.cart_badge}>
            {carts.cartQuantity >= 10 ? "9+" : carts.cartQuantity}
          </div>
        }
      </div>
    </div>
  )
}

export const SliderImage = ({ detail, org }: { detail: DetailProp, org: IOrganization }) => {
  const { data: dataTrends } = useQuery({
    queryKey: ['VIDEO', org?.id],
    queryFn: () => axios.get(`${API_3RD.API_NODE}/trends`, {
      params: { "filter[organization_id]": org?.id },
    }),
    enabled: org?.id ? true : false,
    staleTime: STALE_TIME,
  });
  const trends = dataTrends?.data.data.context.data ?? []
  const trend_videos_url = trends.filter((i: ITrend) => i.services.map(s => s.id)
    .includes(`${detail.id}`))
    .map((i: ITrend) => i.media_url)
  const IS_MB = useDeviceMobile()
  const [index, setIndex] = useState(0)
  const [open, setOpen] = useState(false)
  const refSlider = useRef<any>(null)
  const refThumb = useRef<any>(null)
  const settings: Settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipe: true,
    draggable: true,
    afterChange: (currentIndex) => {
      setIndex(currentIndex)
      if (currentIndex % 5 === 0 && refThumb.current) refThumb.current.slickGoTo(currentIndex)
    }
  }

  const settingsThumb: Settings = {
    dots: false,
    infinite: true,
    arrows: !IS_MB,
    speed: 300,
    slidesToShow: 5,
    slidesToScroll: 5,
    prevArrow: <XButton />,
    nextArrow: <XButton />
  }
  const images = [...trend_videos_url, detail.video_url, detail.image_url || org.image_url]
    .concat(extractImageUrls(detail.description))
    .filter(Boolean)
  const onSlickGoto = (i: number) => {
    if (refSlider.current) {
      refSlider.current.slickGoTo(i)
      setIndex(i)
    }
  }
  return (
    <div className={style.container_head_img_slide}
    >
      <FullImage
        open={open}
        setOpen={setOpen}
        src={images}
        index={index}
      />
      <div className={style.container_head_slide}>
        {
          images.length > 1 &&
          <div className={style.container_head_page}>
            {index + 1}/{images.length}
          </div>
        }
        <Slider ref={refSlider} {...settings}>
          {
            images.map((item) => (
              checkMediaType(item) === 'IMAGE' ?
                <img
                  onClick={() => setOpen(true)}
                  key={item} src={item} alt=''
                  className={style.side_item}
                />
                :
                <div key={item} className={style.side_item_video}>
                  <video
                    className={style.video_container}
                    loop
                    controls
                    webkit-playsinline="webkit-playsinline"
                    playsInline={true}
                  >
                    <source src={item} />
                  </video>
                </div>
            ))
          }
        </Slider>
      </div>
      {
        images.length > 5 &&
        <div className={style.container_head_thumb}>
          <Slider ref={refThumb} {...settingsThumb}>
            {
              images.map((item, i: number) => (
                <div key={i} onClick={() => onSlickGoto(i)} className={style.side_item_thumb}>
                  <div
                    className={i === index ? `${style.thumb_img_cnt} ${style.thumb_act}` : style.thumb_img_cnt}
                  >
                    <img src={checkMediaType(item) === 'IMAGE' ? item : icon.movie} alt="" />
                  </div>
                </div>
              ))
            }
          </Slider>
        </div>
      }
      {
        (images.length > 1 && images.length < 5) &&
        <div className={style.container_head_small}>
          {
            images.map((item, i: number) => (
              <div key={i} onClick={() => onSlickGoto(i)} className={style.side_item_thumb}>
                <div
                  className={i === index ? `${style.thumb_img_cnt} ${style.thumb_act}` : style.thumb_img_cnt}
                >
                  <img src={checkMediaType(item) === 'IMAGE' ? item : icon.movie} alt="" />
                </div>
              </div>
            ))
          }
        </div>
      }
    </div>
  )
}
export const DetailOrgCard = ({ org }: { org: IOrganization }) => {
  const { t } = useContext(AppContext) as any
  const { favoriteSt, onToggleFavorite } = useFavorite({
    org_id: org?.id,
    type: 'ORG',
    count: org?.favorites_count,
    favorite: org?.is_favorite
  })
  return (
    <div className={style.detail_org}>
      <div className={style.detail_org_left}>
        <div className={style.org_avatar}>
          <img className={style.org_avatar_img} src={org?.image_url} onError={(e) => onErrorImg(e)} alt="" />
          {
            org.is_momo_ecommerce_enable &&
            <img className={style.org_avatar_icon} src={icon.checkFlowGreen} alt="" />
          }
        </div>
        <div className={style.org_detail}>
          <p className={style.org_name}>{org?.name}</p>
          <p className={style.org_address}>{org?.full_address}</p>
          {
            org?.distance &&
            <div className={style.org_distance}>
              <img src={icon.pinMapRed} alt="" />
              <span>{formatDistance(org?.distance)}</span>
            </div>
          }
        </div>
      </div>
      <div className={style.detail_org_right}>
        <Link
          className={style.detail_org_right_btn}
          to={{ pathname: formatRouterLinkOrg(org?.subdomain) }}
        >
          {t('app.details')}
        </Link>
        {/* <XButton
          style={favoriteSt.is_favorite ? {
            backgroundColor: 'var(--red-cl)',
            color: 'var(--bg-white)'
          } : {}}
          title={favoriteSt.is_favorite ? t('pr.liked') : t('pr.like')}
          className={clst([style.detail_org_right_btn, style.detail_org_link])}
          onClick={onToggleFavorite}
        /> */}
        <XButton
          style={{ marginTop: '6px' }}
          className={style.right_btn}
          icon={favoriteSt.is_favorite ? icon.heart : icon.unHeart}
          iconSize={20}
          onClick={onToggleFavorite}
        />
      </div>
    </div>
  )
}
interface DetailDescProps {
  detail: DetailProp;
  org: IOrganization;
  onBookingNow?: () => void;
  PERCENT?: number
}
export const DetailDesc = ({ detail, org, onBookingNow, PERCENT }: DetailDescProps) => {
  const { t } = useContext(AppContext) as any
  const [more, setMore] = useState(true)
  const [contentHeight, setContentHeight] = useState(10)
  const refContent = useRef<HTMLDivElement>(null)
  const refGuide = useRef<HTMLUListElement>(null)
  const refIconGuide = useRef<HTMLImageElement>(null)
  const refPolicy = useRef<HTMLUListElement>(null)
  const refIconPolicy = useRef<HTMLImageElement>(null)
  useEffect(() => {
    if (refContent.current)
      setContentHeight(refContent.current?.offsetHeight)
  }, [refContent.current])
  const onToggleGuide = () => {
    refGuide.current?.classList.toggle(style.guide_list_show)
    refIconGuide.current?.classList.toggle(style.icon_down)
  }
  const onTogglePolicy = () => {
    refPolicy.current?.classList.toggle(style.policy_list_show)
    refIconPolicy.current?.classList.toggle(style.icon_down)
  }
  const onBookOrBuyNow = () => onBookingNow && (scrollTop(), onBookingNow())

  return (
    <>
      <div className={style.container_desc}>
        <div className={style.detail_sticky_cnt}>
          <span className={style.detail_sticky_title}>Bạn đang xem</span>
          <div className={style.sticky_item}>
            <div className={style.sticky_item_img}>
              {
                detail.SPECIAL_PRICE > 0 &&
                <div className={style.sticky_item_percent}>
                  -{PERCENT}%
                </div>
              }
              <img src={detail.image_url ?? org.image_url} alt="" />
            </div>
            <div className={style.sticky_item_de}>
              <span className={style.sticky_item_de_name}>{detail.name}</span>
              <div className={style.sticky_item_de_price}>
                {
                  detail.SPECIAL_PRICE > 0 ?
                    <>
                      <p>{formatPrice(detail.SPECIAL_PRICE)}đ</p>
                      <p>{formatPrice(detail.PRICE)}</p>
                    </>
                    :
                    <p>{formatPrice(detail.PRICE)}đ</p>
                }
              </div>
            </div>
            <div className={style.sticky_item_bot}>
              <XButton
                onClick={onBookOrBuyNow}
                title={detail.type === 'SERVICE' ? 'Đặt hẹn ngay' : 'Mua ngay'}
              />
            </div>
          </div>
        </div>
        <div className={style.desc_body_cnt}>
          <p className={style.container_desc_title}>
            {t('detail_item.desc')}
          </p>
          <div
            style={more ? { height: 'max-content', maxHeight: 'unset' } : {}}
            className={style.container_desc_content}
          >
            <div
              style={{
                whiteSpace: 'pre-line',
              }}
              ref={refContent}
            >
              {
                detail.description === "" ? t('detail_item.updating') + '...' :
                  <div
                    className={style.container_desc_content_txt}
                    dangerouslySetInnerHTML={{ __html: detail.description }}
                  />
              }
            </div>
            {contentHeight > 100 && !more && <div className={style.gradient}></div>}
          </div>
          {
            contentHeight > 100 &&
            <XButton
              onClick={() => setMore(!more)}
              className={style.view_more_btn}
              title={more ? t('Mer_de.hide') : t('detail_item.see_more')}
            />
          }
          {
            detail.type === 'COMBO' &&
            <div className="">
              <p className={style.container_desc_title}>
                Combo bao gồm:
              </p>
              <div className={style.combo_services}>
                <ul className={style.combo_services_list}>
                  {
                    detail.services?.map((item: any, index: number) => (
                      <li key={index} className={style.combo_services_item}>
                        <SerProItem
                          item={item}
                          org={org}
                          type='SERVICE'
                        />
                        {
                          item.pivot?.number &&
                          <div className={style.combo_item_quantity}>
                            x{item.pivot?.number}
                          </div>
                        }
                      </li>
                    ))
                  }
                </ul>
              </div>
            </div>
          }
          <div className={style.policy}>
            (*) {t('detail_item.shelf_life')}
          </div>
          <div className={style.guide_container}>
            <div
              onClick={onToggleGuide}
              className={style.guide_container_head}
            >
              <p className={style.container_desc_title}>
                {t('se.guide')}
              </p>
              <img ref={refIconGuide} className={style.icon_right} src={icon.arrowDownPurple} alt="" />
            </div>
            <ul ref={refGuide} className={style.guide_list}>
              <li>{t('detail_item.step_1')}</li>
              <li>{t('detail_item.step_2')}</li>
              <li>{t('detail_item.step_3')}</li>
            </ul>
          </div>
          <div className={style.guide_container}>
            <div
              onClick={onTogglePolicy}
              className={style.guide_container_head}
            >
              <p className={style.container_desc_title}>
                {t('se.instructions_terms')}
              </p>
              <img ref={refIconPolicy} className={style.icon_right} src={icon.arrowDownPurple} alt="" />
            </div>
            <ul ref={refPolicy} className={style.policy_list}>
              <li>
                <p className={style.policy_list_title}>{t('contact_form.confirm')}</p>
                <p className={style.policy_list_content}>
                  {t('detail_item.confirm_desc')}{"  "}0289 9959 938
                </p>
              </li>
              <li>
                <p className={style.policy_list_title}>{t('detail_item.cancellation_policy')}</p>
                <p className={style.policy_list_content}>
                  {t('detail_item.policy_desc')}
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}
const DetailBottom = (
  { detail, org, discounts, PERCENT, onCommerce, USER }:
    {
      detail: DetailProp,
      org: IOrganization,
      discounts: IDiscountPar[],
      PERCENT: number,
      onCommerce: boolean,
      USER: IUSER,
    }
) => {
  const { t } = useContext(AppContext) as any
  const [dra, setDra] = useState({
    open: false, type: ''
  })
  return (
    <div className={style.bottom}>
      {
        onCommerce ?
          <div className={style.bottom_wrap}>
            <div className={style.bottom_wrap_btns}>
              {USER && <ChatButton customPosition={false} org={org} />}
            </div>

            <div className={style.bottom_wrap_btns}>
              <XButton
                title={t('pr.add_to_cart')}
                onClick={() => setDra({ open: true, type: 'ADD_CART' })}
                icon={icon.cartWhiteBold}
                className={style.botton_btn}
              />
              <XButton
                style={isPlatformViettel() ? { backgroundColor: 'var(--purple)' } : {}}
                title={detail.type === 'SERVICE' ? t('detail_item.booking_now') : t('cart.payment_now')}
                onClick={() => setDra({ open: true, type: 'NOW' })}
              />
            </div>
          </div>
          :
          <p className={style.detail_dis}>
            {t('pr.This product/service is not sold online yet')}
          </p>
      }
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
                    <span className={style.duration_item_text}>{detail.duration} phút</span>
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
                  {detail.SPECIAL_PRICE > 0 && <span>{formatPrice(detail.SPECIAL_PRICE)}đ</span>}
                  <span>{formatPrice(detail.PRICE)}đ</span>
                </div>
              </div>
            </div>
          </div>
          <DetailQuantity
            draType={dra.type} org={org} detail={detail}
            discounts={discounts}
          />
        </div>
      </Drawer>
    </div>
  )
}
const DetailQuantity = (
  { detail, org, discounts, draType, onClose }:
    { detail: DetailProp, org: IOrganization, discounts: IDiscountPar[], draType?: string, onClose?: () => void }
) => {
  const { t } = useContext(AppContext) as any
  const { cart_confirm } = useCartReducer()
  const cartOtherOrg = cart_confirm.filter(i => i.org_id !== org.id)
  const [quantity, setQuantity] = useState(1)
  const [open, setOpen] = useState(false)
  const vouchers = IS_VOUCHER(discounts);
  const dispatch = useDispatch()
  const { USER } = useSelector((state: IStore) => state.USER)
  const history = useHistory()
  const onDescQuantity = () => quantity > 1 && setQuantity(quantity - 1)
  //transform data add to cart
  const sale_price = detail.SPECIAL_PRICE > 0 ? detail.SPECIAL_PRICE : detail.PRICE
  const values = formatAddCart(detail, org, detail.type, quantity, sale_price);
  const handleAddCart = () => {
    for (let i = 0; i < cartOtherOrg.length; i++) {
      dispatch(unCheck(cartOtherOrg[i]))
    }
    if (USER) {
      const valuesCart = {
        ...values,
        user_id: USER.id,
        isConfirm: true
      }
      dispatch(addCart(valuesCart))
      setOpen(true)
      if (onClose) onClose()
    } else {
      history.push("/sign-in?1")
    }
  }
  const onBookingNow = () => {
    if (USER) {
      const services = [{ service: detail, quantity: quantity }];
      const TYPE = "BOOK_NOW";
      history.push({
        pathname: "/dat-hen",
        state: { org, services, TYPE, vouchers },
      })
      dispatch(clearAllServices());
    } else {
      history.push("/sign-in?1")
    }
  }
  const onBuyNow = () => {
    if (USER) {
      dispatch(onClearPrevCartItem())
      const valuesCart = {
        ...values,
        isConfirm: true,
        user_id: USER.id
      }
      dispatch(addCart(valuesCart))
      history.push('/gio-hang')
    } else {
      history.push("/sign-in?1");
    }
  }
  return (
    <div className={style.detail_cart}>
      <div className={style.detail_quantity}>
        <span className={style.detail_quantity_title}>{t('detail_item.quantity')}</span>
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
            style={isPlatformViettel() ? { backgroundColor: 'var(--purple)' } : {}}
          />
        </div>
      </div>
      <div className={style.add_cart}>
        {detail.type === 'SERVICE' &&
          <XButton
            style={draType === "NOW" ? { display: 'flex', backgroundColor: isPlatformViettel() ? 'var(--purple)' : 'var(--pr-green)' } : {}}
            title={t('detail_item.booking_now')}
            className={style.add_cart_btn}
            onClick={onBookingNow}
          />
        }
        {(detail.type === 'PRODUCT' || detail.type === 'COMBO') &&
          <XButton
            style={draType === "NOW" ? { display: 'flex' } : {}}
            title={t('cart.payment_now')}
            className={style.add_cart_btn}
            onClick={onBuyNow}
          />
        }
        <XButton
          style={draType === "ADD_CART" ? { display: 'flex' } : {}}
          icon={icon.cartWhiteBold}
          iconSize={15}
          title={t('detail_item.add_cart')}
          className={style.add_cart_btn}
          onClick={handleAddCart}
        />
      </div>
      <PopupMessage
        iconLabel={detail.image_url}
        content={`Đã thêm ${detail.name} vào giỏ hàng`}
        open={open}
        onClose={() => setOpen(false)}
        autoHide={true}
      />
    </div>
  )
}
export const DetailRecommend = ({ detail, org }: { detail: DetailProp, org: IOrganization }) => {
  const paramsSer = {
    ...paramsServicesOrg,
    'limit': '12',
    'filter[service_group_id]': detail.category?.id
  }
  const paramsPro = {
    ...paramsProductsOrg,
    'limit': '12',
    'filter[product_category_id]': detail.category?.id
  }
  const { data } = useGetByOrgIdCateIdQuery({
    org_id: org.id,
    type: detail.type,
    params: detail.type === 'PRODUCT' ? paramsPro : paramsSer
  })
  return (
    <div className={style.recommend}>
      <div className={style.recommend_section}>
        {
          (data && data.length > 0) &&
          <div>
            <p
              style={{ color: 'var(--text-black)' }}
              className={style.container_desc_title}
            >
              {detail.type === 'SERVICE' ? 'Dịch vụ' : 'Sản phẩm'} tương tự
            </p>
            <div className={style.list_recommend_cnt}>
              <ul className={style.list_recommend}>
                {
                  data?.map((item: any, index: number) => (
                    <li key={index} className={style.list_recommend_item} >
                      <SerProItem
                        type={detail.type === 'PRODUCT' ? 'PRODUCT' : 'SERVICE'}
                        item={item}
                        org={org}
                      />
                    </li>
                  ))
                }
              </ul>
            </div>
          </div>
        }
        <HomeWatched
          classNameTile={clst([style.container_desc_title, style.black])}
          styleProp={{
            margin: '8px 0px 0px 0px',
            padding: '0px'
          }}
        />
      </div>
      <div className={style.recommend_section}>
        <BeautyxCare />
      </div>
    </div>
  )
}
