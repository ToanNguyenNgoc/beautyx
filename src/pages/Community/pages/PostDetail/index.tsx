/* eslint-disable react-hooks/exhaustive-deps */
import { Container } from "@mui/system";
import { XButton } from "components/Layout";
import icon from "constants/icon";
import HeadTitle from "features/HeadTitle";
import { useParams, useHistory, Link } from "react-router-dom";
import style from "./post-detail.module.css";
import { useQuery } from "@tanstack/react-query";
import { QR_KEY } from "config";
import { postApi } from "api";
import { formatDateFromNow } from "utils";
import { Images } from "pages/Community/components";
import Comment from "components/Comment";

function PostDetail() {
  const { id } = useParams() as any;
  const history = useHistory();
  const { data } = useQuery({
    queryKey: [QR_KEY.POSTS, id],
    queryFn: () => postApi.post(id),
    enabled: id ? true : false,
    onError: () => history.replace("/error"),
  });
  const post = data?.context;
  return (
    <>
      <HeadTitle title={"post?.group?.name"} />
      <Container>
        <div className={style.container}>
          <div className={style.head}>
            <div className={style.head_left}>
              <XButton
                onClick={() => history.goBack()}
                className={style.head_left_btn}
                icon={icon.chevronLeft}
                iconSize={28}
              />
              <div className={style.head_left_avatar}>
                <img src={post?.user?.avatar} alt="" />
              </div>
            </div>
            <div className={style.head_right}>
              <p className={style.user_name}>{post?.user?.fullname}</p>
              <p className={style.post_group_name}>
                Trong nhóm{" "}
                <Link to={{ pathname: "/" }}>{"post?.group?.name"}</Link>
              </p>
              <p className={style.created_add}>
                {formatDateFromNow(post?.created_at ?? "")}
              </p>
            </div>
          </div>
          <div className={style.content}>{post?.content}</div>
          <div className={style.images_cont}>
            {post?.media_url && post?.media_url?.length > 0 && (
              <Images images={post.media_url} />
            )}
          </div>
          <div className={style.interactive}>
            <div className={style.interactive_item}>
              <XButton
                // onClick={() => dispatch(onFavorite({ id: post?.id, isFavorite: !post?.isFavorite }))}
                iconSize={28}
                icon={post?.is_favorite ? icon.thumbUpPurple : icon.thumbUp}
              />
              <span>{post?.favorite_count}</span>
            </div>
            <div className={style.interactive_item}>
              <XButton iconSize={28} icon={icon.chatSquare} />
              <span>{post?.comment_count}</span>
            </div>
          </div>

          <div className={style.post_detail_comment}>
            {post && (
              <Comment
                commentable_type="POST"
                commentable_id={post?.id}
                org_id={post?.organization_id}
              />
            )}
          </div>
        </div>
      </Container>
    </>
  );
}

export default PostDetail;
