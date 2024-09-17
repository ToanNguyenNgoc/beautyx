import { Alert, AlertColor, Snackbar } from "@mui/material";
import { createRef, forwardRef, useImperativeHandle, useState } from "react";

export interface AppSnackProps { }
export interface OpenOptions {
  title?: string;
  type?: AlertColor;
  autoHideDuration?: number
}
export interface AppSnackHandler {
  open: (options: OpenOptions) => void;
  close: () => void;
}


export class AlertAppSnack {
  private static alertRef: React.RefObject<AppSnackHandler> = createRef();

  static register(ref: React.RefObject<AppSnackHandler>) {
    this.alertRef = ref;
  }

  static open(options: OpenOptions) {
    this.alertRef.current?.open(options);
  }

  static offLoading() {
    this.alertRef.current?.close();
  }
}

export const AppSnackBar = forwardRef<AppSnackHandler, AppSnackProps>((props, ref) => {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState('Title')
  const [color, setColor] = useState<AlertColor>('success')
  const [autoHideDuration, setAutoHideDuration] = useState(3500)

  useImperativeHandle(ref, () => ({
    open: (options) => {
      setOpen(true);
      if (options.title) setTitle(options.title);
      if (options.type) setColor(options.type);
      if (options.autoHideDuration) setAutoHideDuration(options.autoHideDuration)
      setTimeout(() => {
        setOpen(false)
        setTitle("Title")
        setColor('success')
      }, autoHideDuration)
    },
    close: () => {
      setOpen(false)
      setTitle("Title")
      setColor('success')
    }
  }))

  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={open} autoHideDuration={autoHideDuration} onClose={() => setOpen(false)}
    >
      <Alert onClose={() => setOpen(false)} severity={color} sx={{ width: '100%' }}>
        {title}
      </Alert>
    </Snackbar>
  )
})