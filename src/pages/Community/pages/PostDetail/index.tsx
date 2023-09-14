/* eslint-disable react-hooks/exhaustive-deps */
import { Container } from "@mui/system";
import { XButton } from "components/Layout";
import icon from "constants/icon";
import HeadTitle from "features/HeadTitle";
import { useParams, useHistory } from "react-router-dom";
import style from "./post-detail.module.css";
import { useQuery } from "@tanstack/react-query";
import { QR_KEY } from "config";
import { postApi } from "api";
import { formatDateFromNow, onErrorImg } from "utils";
import { Images, PostLoading } from "pages/Community/components";
import Comment from "components/Comment";
import { useFavorite } from "hooks";
import { formatRouterLinkOrg } from "utils/formatRouterLink/formatRouter";

function PostDetail() {
  const { id } = useParams() as any;
  const history = useHistory();
  const { data, isLoading } = useQuery({
    queryKey: [QR_KEY.POSTS, id],
    queryFn: () => postApi.post(id),
    enabled: id ? true : false,
    onError: () => history.replace("/error"),
  });
  const post = data?.context;
  const { favoriteSt, onToggleFavorite } = useFavorite({
    id: post?.id,
    org_id: post?.organization_id || 0,
    type: 'POST',
    count: post?.favorite_count || 0,
    favorite: post?.is_favorite || false
  })
  const handleGotoORG = (
    e: React.MouseEvent<HTMLDivElement>,
    id?: number
  ) => {
    if (id !== undefined) {
      history.push(formatRouterLinkOrg(id));
      e.preventDefault();
      e.stopPropagation();
    }
  };
  return (
    <>
      <HeadTitle title={"post?.group?.name"} />
      <Container>
        {isLoading && (
          <div
            className={style.container}
            style={{ padding: "0px", boxShadow: "none" }}
          >
            <PostLoading />
          </div>
        )}
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
                <img
                  src={
                    post?.user.avatar
                      ? post?.user.avatar
                      : post?.organization?.image_url
                  }
                  alt=""
                />
              </div>
            </div>
            <div className={style.head_right}>
              <p className={style.user_name}>
                {post?.user ? post?.user?.fullname : post?.organization?.name}
              </p>
              <div className={style.post_item_head_de}>
                {post?.organization !== null && (
                  <div
                    onClick={(e) => handleGotoORG(e, post?.organization_id)}
                    className={style.post_item_head_user}
                  >
                    <img
                      onError={(e) => onErrorImg(e)}
                      className={style.user_avatar}
                      src={post?.organization?.image_url}
                      alt=""
                    />
                    <span className={style.org_name}>
                      {post?.organization?.name}
                    </span>
                  </div>
                )}
                <p className={style.created_add}>
                  {formatDateFromNow(post?.created_at ?? "")}
                </p>
              </div>
            </div>
          </div>
          <div className={style.content}>{post?.content}</div>
          <div className={style.images_cont}>
            {post?.media_url && post?.media_url?.length > 0 && (
              <Images images={post.media_url || []} />
            )}
          </div>
          <div className={style.interactive}>
            <div className={style.interactive_item}>
              <XButton
                onClick={() => onToggleFavorite()}
                iconSize={28}
                icon={
                  favoriteSt.is_favorite ? icon.thumbUpPurple : icon.thumbUp
                }
              />
              <span>{favoriteSt?.favorite_count}</span>
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
                // org_id={post?.organization_id}
              />
            )}
          </div>
        </div>
      </Container>
    </>
  );
}

export default PostDetail;
