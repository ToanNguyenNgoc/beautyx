import icon from "constants/icon";
import { DetailedHTMLProps, FC, HTMLAttributes } from "react";

interface RenderStarProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  point?: number
}

export const RenderStar: FC<RenderStarProps> = (props) => {
  const { point = 5 } = props
  return (
    <div {...props}>
      <div style={{ display: 'flex' }}>
        {
          Array(point > 5 ? 5 : point).fill(null).map((_, index) => (
            <img style={{ width: 14, height: 14, marginRight: 3 }} key={index} src={icon.star} alt="" />
          ))
        }
      </div>
    </div>
  )
}