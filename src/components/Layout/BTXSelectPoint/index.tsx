/* eslint-disable react-hooks/exhaustive-deps */
import { DetailedHTMLProps, FC, HTMLAttributes, useEffect } from "react";
import style from "./style.module.css"
import { useDispatch, useSelector } from "react-redux";
import IStore from "interface/IStore";
import { fetchAsyncUser } from "redux/profile/userSlice";
import icon from "constants/icon";
import formatPrice from "utils/formatPrice";
import { XSwitch } from "../Switch";
import { omit } from "lodash";

interface BTXSelectPointProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  valuePoint?: number;
  onChangePoint?: (e?: number) => void
}

export const BTXSelectPoint: FC<BTXSelectPointProps> = (props) => {
  const { valuePoint = 0, onChangePoint = () => { } } = props
  const dispatch = useDispatch()
  useEffect(() => { dispatch(fetchAsyncUser()) }, [])
  const { USER } = useSelector((state: IStore) => state.USER)
  const onChangeSwitch = (checked: boolean) => {
    if (checked) {
      onChangePoint(Number(USER?.btx_points))
      // onChangePoint(1000)
    } else {
      onChangePoint(undefined)
    }
  }
  const disable = !USER?.btx_points || Number(USER?.btx_points) === 0
  // const disable = false
  return (
    <div
      {...omit(props, ['onChangePoint', 'valuePoint'])}
      className={`${props.className} ${style.cnt}`}
      style={{ opacity: disable ? '0.6' : '1' }}
    >
      <div className={style.left}>
        <img src={icon.coins} alt="" />
        <div className={style.left_value}>
          <p>Giảm {formatPrice(USER?.btx_points || 0)}đ</p>
          <p>Khi dùng {USER?.btx_points || 0} của bạn</p>
        </div>
      </div>
      <div className={style.right}>
        <XSwitch
          disable={disable}
          value={valuePoint > 0 ? true : false}
          label="" onChange={(e) => onChangeSwitch(e.target.checked)}
        />
      </div>
    </div>
  )
}