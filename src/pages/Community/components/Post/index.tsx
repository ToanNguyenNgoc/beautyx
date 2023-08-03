import { XButton } from 'components/Layout';
import icon from 'constants/icon';
import { Link } from 'react-router-dom';
import style from './com-cpn.module.css'
import { IPost } from 'interface';
import { formatDateFromNow } from 'utils';
import { Images } from './Images'
import { useFavorite } from 'hooks';
import { FC } from 'react';

interface PostItemProps {
    post: IPost
}

export const PostItem: FC<PostItemProps> = ({ post }) => {
    const { favoriteSt, onToggleFavorite } = useFavorite({
        id: post.id,
        org_id: post.organization_id,
        type: 'POST',
        count: post.comment_count,
        favorite: post.is_favorite
    })
    return (
        <>
            <div className={style.post_item}>
                <div className={style.post_item_head}>
                    <div className={style.post_item_head_group}>
                        {/* <img src={post.group.image_url} alt="" /> */}
                    </div>
                    <div className={style.post_item_head_cnt}>
                        <p className={style.post_item_group_name}>{post.user?.fullname}</p>
                        <div className={style.post_item_head_de}>
                            <div className={style.post_item_head_user}>
                                <img className={style.user_avatar} src={post.user.avatar} alt="" />
                                <span className={style.user_name}>{post.user.fullname}</span>
                            </div>
                            <span className={style.post_create_at}>
                                {formatDateFromNow(post.created_at)}
                            </span>
                            {/* <span className={style.post_group_cate}>{post.groupCate.name}</span> */}
                        </div>
                    </div>
                </div>
                <div className={style.post_item_content}>
                    {post.content}...<Link to={{ pathname: `/bai-viet/${post.id}` }} >xem thêm</Link>
                </div>
                <div className={style.post_item_img_cnt}>
                    {
                        post.media_url?.length > 0 &&
                        <Images images={post.media_url} />
                    }
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
