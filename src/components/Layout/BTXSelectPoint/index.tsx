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
  totalOrigin?: number;
  valuePoint?: number;
  onChangePoint?: (e?: number) => void
}

export const BTXSelectPoint: FC<BTXSelectPointProps> = (props) => {
  const { totalOrigin = 0, valuePoint = 0, onChangePoint = () => { } } = props
  const dispatch = useDispatch()
  useEffect(()=>{
    const timer = setTimeout(()=>{
      dispatch(fetchAsyncUser())
    },500)
    return () => clearTimeout(timer)
  },[])
  const { USER } = useSelector((state: IStore) => state.USER)
  let savePrice = Number(USER?.btx_points)
  if (savePrice > totalOrigin) { savePrice = totalOrigin }
  if (totalOrigin - savePrice > 0 && totalOrigin - savePrice < 1000) {
    savePrice = totalOrigin - 1000 // Đảm bảo giá thanh toán cuối cùng đơn hàng vừa thanh toán online + BTX >= 1000
  }
  if (totalOrigin === 0) savePrice = 0
  const onChangeSwitch = (checked: boolean) => {
    if (checked) {
      onChangePoint(savePrice)
    } else {
      onChangePoint(0)
    }
  }
  useEffect(() => { onChangePoint(0) }, [totalOrigin])
  const disable = !USER?.btx_points || Number(USER?.btx_points) === 0 || totalOrigin === 0
  return (
    <div
      {...omit(props, ['onChangePoint', 'valuePoint', 'totalOrigin'])}
      className={`${props.className} ${style.cnt}`}
      style={{ opacity: disable ? '0.6' : '1' }}
    >
      <div className={style.left}>
        <img src={icon.coins} alt="" />
        <div className={style.left_value}>
          {
            totalOrigin > 0 ?
              <>
                <p>Giảm {formatPrice(savePrice || 0)}đ</p>
                <p className={style.left_value_gray}>Khi dùng {savePrice || 0} BTX point của bạn</p>
              </>
              :
              <p className={style.left_value_gray} >Vui lòng chọn dịch vụ/sản phẩm thanh toán</p>
          }
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