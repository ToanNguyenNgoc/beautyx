import { ChangeEvent, useState } from "react";
import { Dialog } from "@mui/material";
import { useDispatch } from "react-redux";
import { onErrorImg } from "utils";
import icon from "constants/icon";
import HeadMobile from "features/HeadMobile";
import { XButton } from "components/Layout";
import { useComment, useDeviceMobile, useNoti, usePostMedia } from "hooks";
import { IOrganization, ItemReviewed } from "interface";
import style from './review.module.css'
import { PopupBtxReward } from "components/Notification";
import Skeleton from "react-loading-skeleton";
import { onUserUpdatePoint } from "redux/profile/userSlice";
import { onUpdateOrderReviewed } from "redux/order-has-review/OrderHasReviewSlice";

interface media_ids {
  model_id: number,
  original_url: string
}

interface InitComment {
  body: string,
  media_ids: media_ids[],
  rate: number,
}


interface ReviewProps {
  open: boolean,
  onClose?: () => void,
  itemsReviews: ItemReviewed[],
  org: IOrganization,
  order_id: number,
  point?: number
}
const initComment: InitComment = {
  body: "",
  media_ids: [],
  rate: 5,
}
const rateStars = [
  { id: 1, icon: icon.startBold, iconActive: icon.starLine, title: "Rất tệ" },
  { id: 2, icon: icon.startBold, iconActive: icon.starLine, title: "Tệ" },
  { id: 3, icon: icon.startBold, iconActive: icon.starLine, title: "Bình thường" },
  { id: 4, icon: icon.startBold, iconActive: icon.starLine, title: "Tốt" },
  { id: 5, icon: icon.startBold, iconActive: icon.starLine, title: "Rất tốt" },
];
function Review(props: ReviewProps) {
  const { open, onClose = () => { }, itemsReviews, org, order_id, point } = props;
  const IS_MB = useDeviceMobile();
  const { handlePostMedia } = usePostMedia()
  const { resultLoad, noti } = useNoti()
  const [comment, setComment] = useState(initComment)
  const onRateStar = (id: number) => {
    setComment({
      ...comment,
      rate: id,
    });
  };
  const handleOnchangeText = (e: any) => {
    setComment({
      ...comment,
      body: e.target.value,
    });
  };
  const handleOnchangeMedia = (e: ChangeEvent<HTMLInputElement>) => {
    handlePostMedia({
      e,
      callBack: (data) => {
        setComment({
          ...comment,
          media_ids: [...comment.media_ids.filter(i => i.original_url !== ''), ...data]
        })
      }

    })
  };
  const onRemoveImg = (model_id: number) => {
    setComment({
      ...comment,
      media_ids: comment.media_ids.filter(i => i.model_id !== model_id)
    })
  }
  const { postComment, loadPost } = useComment()
  const dispatch = useDispatch()
  const onSubmitComment = () => {
    const body = {
      "body": `${comment.body}`,
      "commentable_id": order_id,
      "commentable_type": 'ORDER',
      "organization_id": org.id,
      "media_ids": comment.media_ids.map(i => i.model_id),
      "rate": comment.rate
    }
    postComment({
      body,
      onSuccess: () => {
        resultLoad(``);
        setComment(initComment)
        dispatch(onUpdateOrderReviewed(order_id))
        if (point) dispatch(onUserUpdatePoint(point))
      },
      onError: () => {
        resultLoad('Có lỗi xảy ra. Vui lòng thử lại')
      }
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
            <ul className={style.list}>
              {
                itemsReviews.map((item: ItemReviewed, index: number) => ((
                  <li key={index} className={style.item}>
                    <div className={style.item_img}>
                      <img
                        src={item.image_url ?? org?.image_url}
                        onError={(e) => onErrorImg(e)} alt=""
                      />
                    </div>
                    <div className={style.item_name}>{item.name}</div>
                  </li>
                )))
              }
            </ul>
            <div className={style.rate_star}>
              <p className={style.title}>
                Bạn cảm thấy dịch vụ thế nào ?
              </p>
              <ul className={style.rate_star_list}>
                {
                  rateStars.map(i => (
                    <li
                      onClick={() => onRateStar(i.id)}
                      key={i.id} className={style.star_item}
                    >
                      <img
                        src={i.id <= comment.rate ? i.icon : i.iconActive}
                        className={style.star_icon} alt=""
                      />
                      <p className={style.star_item_label}>{i.title}</p>
                    </li>
                  ))
                }
              </ul>
            </div>
            <textarea
              placeholder="Vui lòng để lại đánh giá của bạn ..."
              value={comment.body}
              onChange={(e) => handleOnchangeText(e)}
              className={style.text_area}
            />
            <div className={style.body_media}>
              <div className={style.body_media_head}>
                <label className={style.body_media_btn} htmlFor="media">
                  <img src={icon.addImg} alt="" />
                  Hình ảnh
                </label>
                <input
                  onChange={handleOnchangeMedia}
                  id='media' multiple
                  hidden
                  accept="image/png, image/jpeg, image/jpg" type="file"
                />
              </div>
              <div className={style.media_img_cnt}>
                <ul className={style.list_img}>
                  {
                    comment.media_ids.map((item: media_ids) => (
                      <li key={item.model_id} className={style.list_img_item}>
                        <div className={style.img_cnt}>
                          {
                            item.original_url === '' ?
                              <Skeleton className={style.skelton} />
                              :
                              <>
                                <XButton
                                  className={style.img_cnt_remove}
                                  icon={icon.closeCircle}
                                  onClick={() => onRemoveImg(item.model_id)}
                                />
                                <img
                                  src={item.original_url}
                                  className={style.img_item_temp} alt=""
                                />
                              </>
                          }
                        </div>
                      </li>
                    ))
                  }
                </ul>
              </div>
            </div>
          </div>
          <div className={style.bottom}>
            <XButton
              title="Gửi đánh giá"
              loading={loadPost}
              onClick={onSubmitComment}
              className={style.bottom_btn}
            />
          </div>
        </div>
        <PopupBtxReward open={noti.openAlert} onClose={onClose} btxPoint={Number(point)} />
      </Dialog>
    </>
  );
}

export default Review;
