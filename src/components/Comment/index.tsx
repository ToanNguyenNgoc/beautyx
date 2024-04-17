import { FC, useRef, useState, ChangeEvent, useEffect, useContext, memo } from 'react';
import { useSelector } from 'react-redux';
import style from "./style.module.css"
import IStore from 'interface/IStore';
import { BodyComment, IComment } from 'interface';
import { useCheckUserBought, usePostMedia, Media, useSwr } from 'hooks';
import { Link, useHistory, useLocation } from 'react-router-dom';
import commentsApi from 'api/commentsApi';
import { XButton, XButtonFile } from 'components/Layout';
import icon from 'constants/icon';
import CommentParItem from './CommentParItem';
import { Avatar, CircularProgress } from '@mui/material';
import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { clst, slugify } from 'utils';
import { AppContext } from 'context';
import { formatLinkDetail } from 'utils/formatRouterLink/formatRouter';
import { routeType } from 'pages/_SerProCoDetail';
import { CACHE_TIME } from 'common';

export interface CommentProps {
  commentable_type: any
  commentable_id?: number,
  org_id?: number,
  commentsMixed?: IComment[],
  layout?: 'column' | 'row',
  fixed_input?: boolean,
  classNameCnt?: string,
  classNameInputCnt?: string,
  all?: boolean,
  hiddenInput?: boolean
}
export interface InitialValue {
  body?: string,
  media_ids?: Media[]
}

function Comment({
  commentable_type, commentable_id, org_id, commentsMixed = [], layout = 'row', classNameCnt = '', classNameInputCnt = '',
  all = false,
  hiddenInput = false
}: CommentProps) {
  const { USER } = useSelector((state: IStore) => state.USER);
  const location = useLocation()
  const { bought } = useCheckUserBought({
    commentable_type,
    commentable_id: commentable_id || Number(org_id),
    org_id: org_id || 0
  })
  const { handlePostMedia } = usePostMedia()
  const history = useHistory()
  const [value, setValue] = useState<InitialValue>({ body: '' })
  const cntRef = useRef<HTMLDivElement>(null)
  const client = useQueryClient()
  const QR_KEY = ['COMMENT', commentable_type, commentable_id, org_id]
  const { data } = useInfiniteQuery({
    queryKey: QR_KEY,
    queryFn: ({ pageParam = 1 }) => commentsApi.finAll({
      'filter[organization_id]': commentable_type === "ORGANIZATION" ? (all ? org_id : '') : org_id,
      'filter[commentable_type]': all ? "" : commentable_type,
      'filter[commentable_id]': all ? "" : commentable_id,
      'page': pageParam,
      'limit': 20
    }),
    enabled: !!org_id,
    onSuccess: () => {
      if (location.hash === "#cmt" && cntRef.current) {
        cntRef.current.scrollIntoView({ behavior: 'auto' })
      }
    }
  })
  const { mutate, isLoading } = useMutation({
    mutationFn: (body: BodyComment) => commentsApi.create(body),
    onSuccess: () => { client.invalidateQueries({ queryKey: QR_KEY }); setValue({ body: '' }) }
  })
  const bodyComment = {
    "body": `${value?.body}${bought ? `‭` : ''}`,
    "commentable_id": commentable_id || org_id,
    "commentable_type": commentable_type === "COMBO" ? "TREATMENT_COMBO" : commentable_type,
    "organization_id": org_id,
    "media_ids": value?.media_ids?.map(i => i.model_id) || [],
  }
  const handlePostCmt = async () => {
    if (!USER) return history.push("/sign-in?1")
    if ((bodyComment.body.length > 0 && bodyComment.body !== '‭') || (bodyComment.media_ids?.length > 0)) {
      mutate(bodyComment)
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
  const comments = data?.pages.map(i => i.context.data).flat() || []
  const onRemoveMedia = (model_id: number) => {
    setValue(prev => { return { ...prev, media_ids: prev?.media_ids?.filter(i => i.model_id !== model_id) } })
  }
  return (
    <div ref={cntRef} className={clst([style.container, classNameCnt])}>
      <div className={clst([style.input_wrapper, classNameInputCnt])}>
        {
          !hiddenInput &&
          <div className={style.input_cnt}>
            <div className={style.input_avatar}>
              <Avatar src={USER?.avatar} alt={USER?.fullname} />
            </div>
            <div className={style.input}>
              <div className={style.input_body}>
                <Textarea
                  onKeyDown={handlePostCmt}
                  text={value?.body} onChange={(e) => setValue(prev => { return { ...prev, body: e.target.value } })}
                />
                <div className={style.input_btn}>
                  <XButtonFile onChange={onChangeMedia} multiple iconSize={18} icon={icon.addFileWhite} />
                  <XButton onClick={handlePostCmt} loading={isLoading} iconSize={18} icon={icon.planPaperWhite} />
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
        }
      </div>
      <div className={style.body}>
        <ul className={style.cmt_list}>
          {
            comments.map((item: IComment, index: number) => (
              <li key={index} className={style.cmt_list_li}>
                <CommentParItem
                  layout={layout}
                  comment={item}
                  org_id={org_id}
                  USER_PAR_NAME={item.user?.fullname}
                  bought={bought}
                  all={all}
                />
              </li>
            ))
          }
          {
            commentsMixed.map((item: IComment, index: number) => (
              <li key={index} className={style.cmt_list_li}>
                <CommentParItem
                  layout={layout}
                  comment={item}
                  USER_PAR_NAME={item.user?.fullname}
                  mixed
                />
              </li>
            ))
          }
        </ul>
      </div>
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
  const { t } = useContext(AppContext) as any;
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
      onKeyDown={(e) => {
        if (e.code === "Enter") {
          e.preventDefault();
          onKeyDown(e);
        }
      }}
      className={style.input_txt}
      rows={1}
      placeholder={t("detail_item.write_a_comment")}
    />
  );
}

export const RedirectOrigin: FC<{ comment: IComment }> = memo(({ comment }) => {
  let path = ''
  if (comment.commentable_type === 'App\\Models\\CI\\Service') path = 'dich-vu'
  if (comment.commentable_type === 'App\\Models\\CI\\Product') path = 'san-pham'
  const currentRouteType = routeType.find(i => i.path === path)
  const { response } = useSwr({
    API_URL: `/organizations/${comment.organization_id}/${currentRouteType?.api}/${comment.commentable_id}`,
    enable: currentRouteType,
    params: currentRouteType?.params ?? {},
    dedupingInterval: CACHE_TIME
  })
  if(!response) return <></>
  const name = response?.service_name || response?.name

  return (
    <div className={style.redirect_cnt}>
      <span>Đánh giá cho: {name}</span>
      <Link
        to={formatLinkDetail(comment.commentable_id, Number(comment.organization_id), slugify(name), comment.commentable_type)}
        className={style.comment_body_origin_btn} >
        Đặt hẹn ngay
      </Link>
    </div>
  )
})