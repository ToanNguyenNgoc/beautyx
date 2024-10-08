import React, { useContext, useState } from "react";
import { IOrderV2, IOrganization, ItemReviewed, ITems } from "interface";
import icon from "constants/icon";
import { clst, onErrorImg } from "utils";
import formatPrice from "utils/formatPrice";
import style from '../order.module.css'
import dayjs from "dayjs";
import { XButton } from "components/Layout";
import { useDeviceMobile, useTransformOrderStatus } from "hooks";
import { AppContext, AppContextType } from "context/AppProvider";
import Review from "features/Review";
import OrderDetail from "../../OrderDetail";
import { PopupQr } from "components/Notification";
import { Link } from "react-router-dom";
import { formatLinkDetail } from "utils/formatRouterLink/formatRouter";
import { BTX_POINT_RATIO } from "constants/index";
import { useSelector } from "react-redux";

interface IProp {
  order: IOrderV2;
}

function OrderItem(props: IProp) {
  const { order } = props;
  const IS_MB = useDeviceMobile()
  const { t } = useContext(AppContext) as AppContextType
  const [openQr, setOpenQr] = useState(false);
  const [openReview, setOpenReview] = useState(false);
  const { statusTransform } = useTransformOrderStatus(order.status)
  const [open, setOpen] = useState(false);
  const org = order.organization

  const itemsReviewed: ItemReviewed[] = order.items?.map(i => {
    return {
      id: i?.productable_id,
      name: i?.productable?.product_name ?? i?.productable?.service_name,
      image_url: i?.productable?.image_url,
      type: i?.productable_type === "App\\Models\\CI\\Product" ? "PRODUCT" : "SERVICE"
    }
  })
  let amount = order?.amount
  if (order?.amount !== order?.payment_gateway?.amount) {
    amount = order?.payment_gateway?.amount
  }
  const { ordersHasReview } = useSelector((state: any) => state.ORDER_HAS_REVIEW)
  return (
    <>
      <Review
        order_id={order.id}
        itemsReviews={itemsReviewed}
        org={order.organization}
        onClose={() => setOpenReview(false)}
        open={openReview}
        point={Number(amount / BTX_POINT_RATIO)}
      />
      <PopupQr open={openQr} setOpen={setOpenQr} qr={order.qr_link} />
      <div className={style.container}>
        <div className={style.head_create}>
          <div className={style.head_create_left}>
            {t('acc.code')}
            <h4>
              #{order?.payment_gateway?.transaction_uuid}-
              {order?.origin_id}
            </h4>
          </div>
          <div className={style.head_create_right}>
            <span className={style.created_at}>
              {dayjs(order.created_at).format('HH:mm DD/MM/YYYY')}
            </span>
            {
              (IS_MB && order.status === 'PAID') &&
              <XButton
                onClick={() => setOpenQr(true)}
                className={style.head_create_right_btn}
                icon={icon.scanQrBtn}
                iconSize={22}
              />
            }
          </div>
        </div>
        <div className={style.head_org}>
          <span className={style.head_org_name}>{order?.organization?.name}</span>
          <div
            style={{ color: statusTransform?.color }}
            className={style.status}
          >
            {statusTransform?.title}
          </div>
        </div>
        <ul className={style.order_items}>
          {
            order?.items?.map((item, index: number) => (
              <li key={index} className={style.order_items_pro}>
                <Item item={item} org={org} />
              </li>
            ))
          }
        </ul>
        <div className={style.amount}>
          <span className={style.amount_title}>{t('pr.total')}:</span>
          <div className={style.amount_number}>
            {order?.amount !== order?.payment_gateway?.amount ?
              <>
                <span style={{ color: "var(--orange)" }}>
                  {formatPrice(order?.payment_gateway?.amount)}đ
                </span>
                <span>
                  {formatPrice(order?.amount)}đ
                </span>
              </>
              :
              <span style={{ display: 'flex', alignItems: 'center' }}>
                {formatPrice(order?.payment_gateway?.amount)}đ
                {/* {
                                    order?.payment_gateway?.amount_second &&
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        marginLeft: '2px',
                                        fontSize:'13px'
                                    }}>
                                        +{formatPrice(order.payment_gateway.amount_second)} 
                                        <img style={{margin:'0px 2px'}} src={icon.coins} alt="" />
                                        BTX
                                    </div>
                                } */}
              </span>
            }
          </div>
        </div>
        <div className={style.bottom}>
          {/* BTX POINT */}
          {
            (order.status === 'PAID') &&
            <>
              {
                // (order.is_review === 0 || !ordersHasReview.includes(order.id)) ?
                (!ordersHasReview.includes(order.id)) ?
                  <div className={style.review_tip_cnt}>
                    <span className={style.review_tip_txt}>
                      Nhận ngay BTX Point
                    </span>
                    <XButton
                      className={clst([style.bottom_detail_btn, style.review_btn])}
                      title={`${t('detail_item.evaluate')} + ${amount / BTX_POINT_RATIO}`}
                      icon={icon.coins}
                      iconSize={20}
                      onClick={() => setOpenReview(true)}
                    />
                  </div>
                  :
                  <XButton
                    style={{ opacity: 0.4 }}
                    className={clst([style.bottom_detail_btn, style.review_btn])}
                    title={t('detail_item.reviewed')}
                    icon={icon.chatWhite}
                    iconSize={10}
                  />
              }
            </>
          }
          <XButton
            onClick={() => setOpen(true)}
            className={style.bottom_detail_btn}
            title={t('app.details')}
            icon={icon.arrownRightWhite}
            iconSize={10}
          />
        </div>
      </div>
      <OrderDetail
        open={open} setOpen={setOpen} order={order}
      />
    </>
  );
}

export default OrderItem;

export const Item = ({ item, org }: { item: ITems, org: IOrganization }) => {
  const displayPrice = item.discount ?
    item.base_price - item.discount_value / item.quantity :
    item.base_price
  const name = item.productable?.service_name ?? item.productable?.product_name ?? item.productable?.name
  return (
    <Link
      to={{ pathname: formatLinkDetail(item.productable_id, org.id, name, item.productable_type) }}
      className={style.pro_container}
    >
      <div className={style.pro_img}>
        <img src={
          item.productable?.image ?
            item.productable?.image_url :
            org?.image_url
        } onError={(e) => onErrorImg(e)} alt="" />
      </div>
      <div className={style.pro_detail}>
        <p className={style.pro_detail_name}>
          {name}
        </p>
        <div className={style.pro_detail_price}>
          <span>{formatPrice(displayPrice)}đ</span>
          <span>x {item.quantity}</span>
        </div>
      </div>
    </Link>
  )
}
