import HeadMobile from "features/HeadMobile";
import { FC } from "react";
import { useHistory } from "react-router-dom";

export const CartPaymentSuccess: FC = () => {
  const history = useHistory()
  return (
    <>
      <HeadMobile onBackFunc={() => history.push('/')} title='Trạng thái' />
    </>
  )
}