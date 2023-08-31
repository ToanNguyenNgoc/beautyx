import { FC, useState } from "react";
import style from "./com-cpn.module.css"
import { FullImage } from "components/Layout";
import { checkMediaType } from "utils";

export const Images: FC<{ images: string[] }> = ({ images }) => {
  const [openImg, setOpenImg] = useState(false)
  const [index, setIndex] = useState(0)
  const onRenderList = () => {
    let className = style.parent_5
    switch (images.length) {
      case 1:
        className = style.parent_1
        break;
      case 2:
        className = style.parent_2
        break;
      case 3:
        className = style.parent_3
        break;
      case 4:
        className = style.parent_4
        break;
      default:
        break;
    }
    return className
  }
  const openFull = (i: number) => {
    setIndex(i)
    setOpenImg(true)
  }
  return (
    <>
      <div className={style.images_cnt}>
        {/* <Gallery images={images.map(i => ({ ...i, src: i.original_url }))} /> */}
        <div className={onRenderList()}>
          {
            images.slice(0, 5).map((img, index) => (
              <div
                onClick={() => openFull(index)}
                style={{ cursor: 'pointer' }}
                key={index}
              >
                {
                  checkMediaType(img) === "IMAGE" ?
                    <img className={style.img_item} src={img} alt="" /> :
                    <video
                      className={style.video_item}
                      controls
                      webkit-playsinline="webkit-playsinline"
                      playsInline={true}
                    >
                      <source src={img} />
                    </video>
                }
                {
                  (index === 4 && images.length > 5) &&
                  <div className={style.image_more}>
                    +{images.length - 5}
                  </div>
                }
              </div>
            ))
          }
        </div>
      </div>
      <FullImage
        open={openImg}
        setOpen={setOpenImg}
        src={images}
        index={index}
      />
    </>
  )
}