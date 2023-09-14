import { XButton } from 'components/Layout';
import icon from 'constants/icon';
import { Link, useHistory } from 'react-router-dom';
import style from './com-cpn.module.css'
import { IPost } from 'interface';
import { formatDateFromNow, onErrorImg, scrollTop } from 'utils';
import { Images } from './Images'
import { useFavorite } from 'hooks';
import { FC } from 'react';
import { formatRouterLinkOrg } from 'utils/formatRouterLink/formatRouter';

interface PostItemProps {
  post: IPost
}

export const PostItem: FC<PostItemProps> = ({ post }) => {
  const history = useHistory()
  const { favoriteSt, onToggleFavorite } = useFavorite({
    id: post.id,
    org_id: post.organization_id,
    type: 'POST',
    count: post.favorite_count,
    favorite: post.is_favorite
  })

  const handleGotoORG = (e: React.MouseEvent<HTMLDivElement>, id?: number) => {
    if (id !== undefined) {
      history.push(formatRouterLinkOrg(id));
      e.preventDefault();
      e.stopPropagation();
    }
  };
  return (
    <>
      <div className={style.post_item}>
        <div className={style.post_item_head}>
          <div className={style.post_item_head_group}>
            <img
              onError={(e) => onErrorImg(e)}
              src={
                post.user.avatar
                  ? post.user.avatar
                  : post?.organization?.image_url
              }
              alt=""
            />
          </div>
          <div className={style.post_item_head_cnt}>
            <p className={style.post_item_group_name}>
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
                  <span className={style.user_name}>
                    {post?.organization?.name}
                  </span>
                </div>
              )}

              <span className={style.post_create_at}>
                {formatDateFromNow(post.created_at)}
              </span>
              {/* <span className={style.post_group_cate}>{post.groupCate.name}</span> */}
            </div>
          </div>
        </div>
        <div className={style.post_item_content}>
          {post.content}...
          <Link
            onClick={() => scrollTop("auto")}
            to={{ pathname: `/bai-viet/${post.id}` }}
          >
            xem thêm
          </Link>
        </div>
        <div className={style.post_item_img_cnt}>
          {post.media_url?.length > 0 && (
            <Images images={post.media_url || []} />
          )}
        </div>
        <div className={style.post_item_interactive}>
          <div className={style.interactive_item}>
            <XButton
              onClick={onToggleFavorite}
              iconSize={28}
              icon={favoriteSt.is_favorite ? icon.thumbUpPurple : icon.thumbUp}
            />
            <span>{favoriteSt.favorite_count}</span>
          </div>
          <div className={style.interactive_item}>
            <XButton
              onClick={() => {
                scrollTop("auto");
                history.push(`/bai-viet/${post.id}`);
              }}
              iconSize={28}
              icon={icon.chatSquare}
            />
            <span>{post.comment_count}</span>
          </div>
        </div>
      </div>
    </>
  );
}
