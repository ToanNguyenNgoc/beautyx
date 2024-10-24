import { FC, useEffect, useState } from "react";
import style from './count-down.module.css'

interface CountDownProps {
  seconds?: number;
  onClickTimeOut?: () => void
}

export const CountDown: FC<CountDownProps> = ({
  seconds = 60,
  onClickTimeOut = () => { }
}) => {
  const [sec, setSec] = useState(seconds);
  useEffect(() => {
    const timeSec = setInterval(() => {
      if (sec > 0) {
        setSec(prevState => prevState - 1)
      }
    }, 1000)
    return () => clearInterval(timeSec)
  }, [sec])
  return (
    <div className={style.container}>
      {
        sec > 0 ?
          <span> Hết hạn sau <span className={style.txt_value}>{sec}</span></span>
          :
          <span
            className={style.txt_value}
            onClick={() => {
              setSec(seconds)
              onClickTimeOut()
            }}
          >
            Gửi lại mã
          </span>
      }
    </div>
  )
}