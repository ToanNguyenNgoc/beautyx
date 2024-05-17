/* eslint-disable react-hooks/exhaustive-deps */
import { ChangeEvent, FC, memo, useEffect } from "react";
import { Dialog } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { onErrorImg } from "utils";
import icon from "constants/icon";
import HeadMobile from "features/HeadMobile";
import { RateStar, XButton } from "components/Layout";
import { useComment, useDeviceMobile, useNoti, usePostMedia } from "hooks";
import { IOrganization, ItemReviewed } from "interface";
import style from './review.module.css'
import { PopupBtxReward, PopupNotification } from "components/Notification";
import { onUserUpdatePoint } from "redux/profile/userSlice";
import {
  onChangeBodyServiceItemOrder,
  onChangeRateOrder,
  onInitBody,
  onRemoveMediaServiceOrder,
  onUpdateOrderReviewed
} from "redux/order-has-review/OrderHasReviewSlice";



interface ReviewProps {
  open: boolean,
  onClose?: () => void,
  itemsReviews: ItemReviewed[],
  org: IOrganization,
  order_id: number,
  point?: number
}

function Review(props: ReviewProps) {
  const { open, onClose = () => { }, itemsReviews, org, order_id, point } = props;
  const IS_MB = useDeviceMobile();
  const dispatch = useDispatch()
  const { resultLoad, noti, onCloseNoti } = useNoti()
  useEffect(() => {
    if (open) {
      dispatch(onInitBody({ services: itemsReviews.map(i => i.id) }))
    }
  }, [open])

  const { mutatePostCommentOrder } = useComment()
  const { bodyComment } = useSelector((state: any) => state.ORDER_HAS_REVIEW)
  const onSubmitComment = () => {
    const services = bodyComment.services.filter((i: any) => (i.body.trim() !== "" || i.media_ids.length > 0))
    if (services.length !== itemsReviews.length) {
      return resultLoad('Vui lòng đánh giá tất cả dịch vụ của đơn hàng')
    }
    const bodyServices = services.map((ser: any) => ({ ...ser, media_ids: ser.media_ids.map((i: any) => i.model_id) }))
    const body = {
      ...bodyComment,
      commentable_type: "ORDER",
      services: bodyServices,
      commentable_id: order_id,
      organization_id: org.id,
      media_ids: []
    }
    mutatePostCommentOrder.mutateAsync(body)
      .then(() => {
        resultLoad("POINT");
        dispatch(onUpdateOrderReviewed(order_id))
        if (point) dispatch(onUserUpdatePoint(point))
      })
      .catch(() => {
        resultLoad('Có lỗi xảy ra. Vui lòng thử lại')
      })
  };
  return (
    <>
      <Dialog
        fullScreen={IS_MB}
        open={open}
        onClose={onClose}
      >
        {IS_MB && open && (
          <HeadMobile
            onBack={onClose}
            title="Đánh giá"
          />
        )}
        <div className={style.container}>
          <div className={style.body}>
            <p className={style.org_name}>{org?.name}</p>
            <div>
              <RateStar value={bodyComment.rate} onRateStar={star => dispatch(onChangeRateOrder(star))} />
            </div>
            <ul className={style.list}>
              {
                itemsReviews.map((item: ItemReviewed) => ((
                  <li key={item.id} className={style.item}>
                    <ServiceItemReviewed item={item} />
                  </li>
                )))
              }
            </ul>
          </div>
          <div className={style.bottom}>
            <XButton
              title="Gửi đánh giá"
              loading={mutatePostCommentOrder.isLoading}
              onClick={onSubmitComment}
              className={style.bottom_btn}
            />
          </div>
        </div>
        <PopupBtxReward open={noti.openAlert && noti.message === "POINT"} onClose={onClose} btxPoint={Number(point)} />
        <PopupNotification content={noti.message} open={noti.openAlert && noti.message !== "POINT"} setOpen={onCloseNoti} />
      </Dialog>
    </>
  );
}

interface ServiceItemProps {
  org_image?: string
  item: ItemReviewed
}

const ServiceItemReviewed: FC<ServiceItemProps> = memo(props => {
  const { item, org_image } = props
  const dispatch = useDispatch()
  const { bodyComment } = useSelector((state: any) => state.ORDER_HAS_REVIEW)
  const bodyService = bodyComment.services.find((i: any) => i.id === item.id)
  const onChangeText = (body: string) => {
    dispatch(onChangeBodyServiceItemOrder({
      id: item.id,
      body
    }))
  }
  const { handlePostMedia } = usePostMedia()
  const handleOnchangeMedia = (e: ChangeEvent<HTMLInputElement>) => {
    handlePostMedia({
      e,
      callBack: (data) => {
        dispatch(onChangeBodyServiceItemOrder({
          id: item.id,
          media_ids: data.map(i => ({ model_id: i.model_id, media_url: i.original_url }))
        }))
      }
    })
  };
  return (
    <div className={style.service_item_cnt}>
      <div className={style.rate_star}>
        <p className={style.title}>
          Bạn cảm thấy dịch vụ "{item.name}" thế nào ?
        </p>
        {/* <RateStar value={3} /> */}
      </div>
      <div className={style.service}>
        <div className={style.item_img}>
          <img
            src={item.image_url || org_image}
            onError={(e) => onErrorImg(e)} alt=""
          />
        </div>
        <div className={style.item_name}>{item.name}</div>
      </div>
      <textarea
        placeholder="Vui lòng để lại đánh giá của bạn ..."
        value={bodyService?.body || ''}
        onChange={(e) => onChangeText(e.target.value)}
        className={style.text_area}
      />
      <div className={style.body_media}>
        <div className={style.body_media_head}>
          <label className={style.body_media_btn} htmlFor={`media-${item.id}`}>
            <img src={icon.addImg} alt="" />
            Hình ảnh
          </label>
          <input
            onChange={handleOnchangeMedia}
            id={`media-${item.id}`} multiple
            hidden
            accept="image/png, image/jpeg, image/jpg" type="file"
          />
        </div>
        <div className={style.media_img_cnt}>
          <ul className={style.list_img}>
            {
              bodyService?.media_ids?.map((itemImage: any) => (
                <li key={itemImage.model_id} className={style.list_img_itemImage}>
                  <div className={style.img_cnt}>
                    {
                      itemImage.model_id ?
                        <XButton
                          className={style.img_cnt_remove}
                          icon={icon.closeCircle}
                          onClick={() => dispatch(onRemoveMediaServiceOrder({ id: item.id, model_id: itemImage.model_id }))}
                        />
                        :
                        <></>
                    }
                    <img
                      src={itemImage.media_url}
                      className={style.img_item_temp} alt=""
                    />
                  </div>
                </li>
              ))
            }
          </ul>
        </div>
      </div>
    </div>
  )
})

export default Review;
