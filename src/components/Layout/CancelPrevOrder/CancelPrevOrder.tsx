import { orderApi } from "api/orderApi";
import { FC, Fragment, useEffect } from "react";

export const CancelPrevOrder: FC = () => {
  useEffect(() => {
    const handleCancel = async () => {
      await orderApi.onCancelPrevOrder()//Cancel all order in 'PENDING' status for voucher use
    }
    handleCancel()
  }, [])
  return <Fragment />
}