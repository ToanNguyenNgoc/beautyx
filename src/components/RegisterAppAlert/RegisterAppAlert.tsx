import { Alert, AlertAppSnack, AppAlert, AppAlertHandle, AppSnackBar, AppSnackHandler } from "components/Layout";
import { Popup, PopupMessage, PopupMessageHandle } from "components/Notification";
import { FC, createRef, useEffect } from "react";

export const RegisterAppAlert: FC = () => {
  const alertSnackRef = createRef<AppSnackHandler>();
  const alertRef = createRef<AppAlertHandle>();
  const popupMsgRef = createRef<PopupMessageHandle>();

  useEffect(() => {
    AlertAppSnack.register(alertSnackRef);
    Alert.register(alertRef);
    Popup.register(popupMsgRef)
  }, [alertSnackRef, alertRef, popupMsgRef]);

  return (
    <>
      <AppSnackBar ref={alertSnackRef} />
      <AppAlert ref={alertRef} />
      <PopupMessage ref={popupMsgRef} />
    </>
  )
}