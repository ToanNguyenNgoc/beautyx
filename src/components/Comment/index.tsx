import React, { FC, useRef, useState, ChangeEvent, useEffect } from 'react';
import { useSelector } from 'react-redux';
import style from "./style.module.css"
import IStore from 'interface/IStore';
import { IComment } from 'interface';
import { paramsComment } from 'params-query';
import { useCheckUserBought, useNoti, usePostMedia, useSwrInfinite, Media } from 'hooks';
import { useHistory } from 'react-router-dom';
import commentsApi from 'api/commentsApi';
import { XButton, XButtonFile } from 'components/Layout';
import icon from 'constants/icon';
import CommentParItem from './CommentParItem';
import { Avatar, CircularProgress } from '@mui/material';

export interface CommentProps {
  commentable_type: any
  commentable_id: number,
  org_id: number,
  commentsMixed?: IComment[],
  layout?: 'column' | 'row',
  fixed_input?: boolean
}
export interface InitialValue {
  body?: string,
  media_ids?: Media[]
}

function Comment({
  commentable_type, commentable_id, org_id, commentsMixed = [], layout = 'row'
}: CommentProps) {
  const { USER } = useSelector((state: IStore) => state.USER);
  const { bought } = useCheckUserBought({ commentable_type, commentable_id, org_id })
  const { handlePostMedia } = usePostMedia()
  const { firstLoad, resultLoad, noti } = useNoti()
  const history = useHistory()
  const [value, setValue] = useState<InitialValue>({ body: '' })
  const [cmtArr, setCmtArr] = useState<IComment[]>([])
  const cntRef = useRef(null)
  const params = {
    ...paramsComment,
    "filter[commentable_type]": commentable_type === "COMBO" ? "TREATMENT_COMBO" : commentable_type,
    "filter[commentable_id]": commentable_id,
    "filter[organization_id]": commentable_type !== "ORGANIZATION" ? org_id : ""
  }
  const { resData, totalItem, onLoadMore, isValidating } = useSwrInfinite(
    {
      API_URL: '/comments',
      enable: commentable_id && org_id,
      params: params
    }
  )
  const paramPost = {
    "body": `${value?.body}${bought ? `‭` : ''}`,
    "commentable_id": commentable_id,
    "commentable_type": commentable_type === "COMBO" ? "TREATMENT_COMBO" : commentable_type,
    "organization_id": org_id,
    "media_ids": value?.media_ids?.map(i => i.model_id) || [],
  }
  const handlePostCmt = async () => {
    if (!USER) return history.push("/sign-in?1")
    if ((paramPost.body.length > 0 && paramPost.body !== '‭') || (paramPost.media_ids?.length > 0)) {
      firstLoad()
      try {
        const res = await commentsApi.postComment2(paramPost)
        const newCmt = {
          ...await res.data.context,
          children: [],
          media_url: value?.media_ids?.map(i => i.original_url)
        }
        setCmtArr([newCmt, ...cmtArr])
        setValue({body:''})
        resultLoad('')
      } catch (error) {
        console.log(error)
        resultLoad('Có lỗi xảy ra. Vui lòng thử lại!')
      }
    }
  }
  const onChangeMedia = (e: ChangeEvent<HTMLInputElement>) => {
    handlePostMedia({
      e,
      callBack: (data) => {
        const media_ids = value?.media_ids ? [...data, ...value.media_ids] : data
        setValue(prev => { return { ...prev, media_ids: media_ids } })
      }
    })
  }
  const onRemoveMedia = (model_id: number) => {
    setValue(prev => { return { ...prev, media_ids: prev?.media_ids?.filter(i => i.model_id !== model_id) } })
  }
  return (
    <div ref={cntRef} className={style.container}>
      <div className={style.input_wrapper}>
        <div className={style.input_cnt}>
          <div className={style.input_avatar}>
            <Avatar src={USER?.avatar} alt={USER?.fullname} />
          </div>
          <div className={style.input}>
            <div className={style.input_body}>
              <Textarea text={value?.body} onChange={(e) => setValue(prev => { return { ...prev, body: e.target.value } })} />
              <div className={style.input_btn}>
                <XButtonFile onChange={onChangeMedia} multiple iconSize={18} icon={icon.addFileWhite} />
                <XButton loading={noti.load} onClick={handlePostCmt} iconSize={18} icon={icon.planPaperWhite} />
              </div>
            </div>
            <div className={style.input_image}>
              <div className={style.media_cnt}>
                {
                  value?.media_ids?.map(media => (
                    <div key={media.model_id} className={style.media}>
                      <img src={media.original_url} alt="" />
                      {
                        media.model_id > 0 ?
                          <XButton onClick={() => onRemoveMedia(media.model_id)} className={style.media_rm} icon={icon.closeCircle} iconSize={18} />
                          :
                          <div className={style.media_load}><CircularProgress size={32} /></div>
                      }

                    </div>
                  ))
                }
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={style.body}>
        <ul className={style.cmt_list}>
          {
            cmtArr.concat(resData).map((item: IComment, index: number) => (
              <li key={index} className={style.cmt_list_li}>
                <CommentParItem
                  comment={item}
                  org_id={org_id}
                  USER_PAR_NAME={item.user?.fullname}
                  bought={bought}
                />
              </li>
            ))
          }
          {
            commentsMixed.map((item: IComment, index: number) => (
              <li key={index} className={style.cmt_list_li}>
                <CommentParItem
                  comment={item}
                  USER_PAR_NAME={item.user?.fullname}
                  mixed
                />
              </li>
            ))
          }
        </ul>
      </div>
      {/* <div className={style.cmt_view_more}>
        {
          resData.length >= 10 && resData.length < totalItem &&
          <XButton
            title='Xem thêm đánh giá'
            className={style.cmt_view_more_btn}
            onClick={onViewMoreCmt}
            loading={isValidating}
          />
        }
      </div> */}
    </div>
  );
}

export default Comment;

interface TextareaProps {
  text?: string,
  onKeyDown?: (e: any) => void,
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void,
}

const Textarea: FC<TextareaProps> = ({
  text = '', onChange = () => { }, onKeyDown = () => { }
}) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null)
  const resizeTextArea = () => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      if (text?.length > 0) {
        textAreaRef.current.style.height =
          textAreaRef.current.scrollHeight + "px";
      }
    }
  };
  useEffect(resizeTextArea, [text]);
  return (
    <textarea
      ref={textAreaRef}
      value={text}
      onChange={onChange}
      onKeyDown={onKeyDown}
      className={style.input_txt} rows={1} placeholder='Aa'
    />
  )
}