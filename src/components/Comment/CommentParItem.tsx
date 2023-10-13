import { Accordion, AccordionDetails, AccordionSummary, Avatar } from '@mui/material';
import commentsApi from 'api/commentsApi';
import { XButton } from 'components/Layout';
import icon from 'constants/icon';
import { BodyComment, IComment, ICommentChild } from 'interface';
import IStore from 'interface/IStore';
import { useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { clst, formatDateFromNow } from 'utils';
import { InitialValue } from 'components/Comment';
import style from "./style.module.css"
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AppContext } from 'context';

interface CommentParItemProps {
  QR_KEY?: any,
  comment: IComment,
  org_id?: number,
  USER_PAR_NAME: string,
  bought?: boolean,
  mixed?: boolean,
  layout?: 'column' | 'row',
}

function CommentParItem(props: CommentParItemProps) {
  const { org_id, bought, comment, mixed = false, QR_KEY, layout } = props;
  const { t } = useContext(AppContext) as any;
  let body = comment.body
  try {
    body = JSON.parse(comment.body).text
  } catch (error) {
    body = comment.body
  }
  const history = useHistory()
  const { USER } = useSelector((state: IStore) => state.USER)
  const [value, setValue] = useState<InitialValue>({ body: '' })
  const replyCount = comment.children?.length
  const bodyComment = {
    "body": `${value?.body}${bought ? `‭` : ''}`,
    "commentable_id": comment.id,
    "commentable_type": "REPLY_COMMENT",
    "organization_id": org_id
  }
  const client = useQueryClient()
  const { mutate, isLoading } = useMutation({
    mutationFn: (body: BodyComment) => commentsApi.create(body),
    onSuccess: () => { client.invalidateQueries({ queryKey: QR_KEY }); setValue({ body: '' }) }
  })
  const handlePostCmtReply = async () => {
    if (!USER) history.push("/sign-in?1")
    if (USER && bodyComment.body.length > 0 && bodyComment.body !== '‭') {
      mutate(bodyComment)
    }
  }
  const starElement = []
  const rate: number = comment.rate?.point ?? 0
  for (var i = 0; i < rate; i++) {
    starElement.push(<img key={i} src={icon.star} width={14} height={14} alt="" />)
  }
  let replyBtnDis = false
  if (!mixed) replyBtnDis = true
  if (mixed && replyCount > 0) replyBtnDis = true
  return (
    <div
      className={clst([
        style.comment_item_cnt,
        layout === "column" ? style.comment_item_cnt_ch : "",
      ])}
    >
      <div className={style.comment_item_head}>
        <div className={style.user}>
          <Avatar src={comment.user?.avatar} alt="" />
          <span className={style.user_fullname}>{comment.user?.fullname}</span>
        </div>
        {body?.includes("‭") && (
          <div className={style.bought_cnt}>
            <img src={icon.checkFlowGreen} alt="" /> Đã mua hàng
          </div>
        )}
      </div>
      <div className={style.comment_body}>
        <div className={style.comment_body_txt}>
          {body}
          <div className={style.comment_body_media_list}>
            {comment.media_url?.map((i) => (
              <div key={i} className={style.comment_body_media}>
                <img src={i} alt="" />
              </div>
            ))}
          </div>
        </div>
        <span className={style.created_at}>
          {formatDateFromNow(comment.created_at)}
        </span>
        <div
          className={clst([
            style.reply_cnt,
            layout === "column" ? style.reply_cnt_ch : "",
          ])}
        >
          <Accordion
            defaultExpanded
          >
            {replyBtnDis && (
              <AccordionSummary
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <span className={style.cmt_reply_open}>
                  {replyCount > 0 && replyCount} Phản hồi
                </span>
              </AccordionSummary>
            )}
            <AccordionDetails>
              {comment.children.map((child: ICommentChild, i: number) => (
                <div
                  key={i}
                  style={{ marginBottom: "6px" }}
                  className={clst([
                    style.comment_item_cnt,
                    layout === "column" ? style.comment_item_cnt_ch : "",
                  ])}
                >
                  <div className={style.comment_item_head}>
                    <div className={style.user}>
                      <Avatar src={child.user?.avatar} alt="" />
                      <span className={style.user_fullname}>
                        {child.user?.fullname}
                      </span>
                    </div>
                    {child.body?.includes("‭") && (
                      <div className={style.bought_cnt}>
                        <img src={icon.checkFlowGreen} alt="" /> Đã mua hàng
                      </div>
                    )}
                  </div>
                  <div className={style.comment_body}>
                    <div
                      style={{ backgroundColor: "#c1dbe9" }}
                      className={style.comment_body_txt}
                    >
                      {child.body}
                      <div className={style.comment_body_media_list}>
                        {child.media_url?.map((i) => (
                          <div key={i} className={style.comment_body_media}>
                            <img src={i} alt="" />
                          </div>
                        ))}
                      </div>
                    </div>
                    <span className={style.created_at}>
                      {formatDateFromNow(
                        mixed ? comment.created_at : child.created_at || ""
                      )}
                    </span>
                  </div>
                </div>
              ))}
              {!mixed && (
                <div className={style.reply_input_cnt}>
                  <div className={style.user}>
                    <Avatar src={USER?.avatar} alt={USER?.fullname} />
                  </div>
                  <div className={style.reply_input}>
                    <input
                      value={value.body}
                      onChange={(e) =>
                        setValue((prev) => {
                          return { ...prev, body: e.target.value };
                        })
                      }
                      type="text"
                      placeholder={t("detail_item.write_a_comment")}
                      onKeyDown={(e) => {
                        e.code === "Enter" && handlePostCmtReply();
                      }}
                    />
                    <XButton
                      onClick={handlePostCmtReply}
                      loading={isLoading}
                      icon={icon.planPaperWhite}
                      iconSize={18}
                    />
                  </div>
                </div>
              )}
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
    </div>
  );
}
export default CommentParItem