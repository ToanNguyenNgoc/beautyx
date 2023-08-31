import { FC } from "react"
import style from "./post-loading.module.css"
import Skeleton from "react-loading-skeleton"

export const PostLoading: FC = () => {
  return (
    <div className={style.cnt}>
      <div className={style.head}>
        <div className={style.head_left}>
          <Skeleton style={{ width: '100%', height: '100%' }} />
        </div>
        <div className={style.head_right}> <Skeleton style={{ width: '100%', height: '100%' }} /></div>
      </div>
      <div className={style.content}>
        {
          Array(8).fill(null).map((_, i) => (
            <p key={i} className={style.content_item}> <Skeleton style={{ width: '100%', height: '100%' }} /></p>
          ))
        }
      </div>
      <div className={style.grid_img}>
        <div className={style.grid}>
          {
            Array(5).fill(null).map((_, i) => (
              <div key={i}> <Skeleton style={{ width: '100%', height: '100%' }} /></div>
            ))
          }
        </div>
      </div>
    </div>
  )
}