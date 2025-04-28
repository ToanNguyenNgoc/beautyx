import { FC } from "react"
import { getFileType } from "utils";
import style from './render-media.module.css';

type RenderMediaProps = {
  fileUrl?: string;
  modelType?: string
}

export const RenderMedia: FC<RenderMediaProps> = ({
  fileUrl,
  modelType
}) => {
  console.log(fileUrl);
  const renderMedia = () => {
    let el = (<div></div>);
    const type = getFileType(modelType);
    switch (type) {
      case 'IMAGE':
        el = (
          <div className={style.container}>
            <img src={fileUrl} alt="" className={style.image} />
          </div>
        )
        break;
      case 'VIDEO':
        el = (
          <div className={style.container}>
            <video className={style.video} controls style={{ objectFit: 'contain' }}>
              <source src={fileUrl} />
            </video>
          </div>
        )
        break;

      default:
        break;
    }
    return el
  }
  return renderMedia();
}