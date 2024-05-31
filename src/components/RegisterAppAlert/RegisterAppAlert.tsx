import { Alert, AlertAppSnack, AppAlert, AppAlertHandle, AppSnackBar, AppSnackHandler } from "components/Layout";
import { FC, createRef, useEffect } from "react";

export const RegisterAppAlert: FC = () => {
  const alertSnackRef = createRef<AppSnackHandler>();
  const alertRef = createRef<AppAlertHandle>();

  useEffect(() => {
    AlertAppSnack.register(alertSnackRef);
    Alert.register(alertRef);
  }, [alertSnackRef, alertRef]);

  return (
    <>
      <AppSnackBar ref={alertSnackRef} />
      <AppAlert ref={alertRef} />
    </>
  )
}