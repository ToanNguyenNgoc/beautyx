import { AlertAppSnack, AppSnackBar, AppSnackHandler } from "components/Layout";
import { FC, createRef, useEffect } from "react";

export const RegisterAppAlert: FC = () => {
  const alertSnackRef = createRef<AppSnackHandler>();

  useEffect(() => {
    AlertAppSnack.register(alertSnackRef);
  }, [alertSnackRef]);

  return (
    <>
      <AppSnackBar ref={alertSnackRef} />
    </>
  )
}