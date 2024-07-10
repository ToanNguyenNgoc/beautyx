import { Button, Dialog } from "@mui/material";
import { createRef, forwardRef, useImperativeHandle, useState } from "react";
import style from './app-alert.module.css'

interface AppAlertProps { }
interface Action { text: string; onPress: () => void, type?:'cancel'|'success' }
interface OpenProps {
  title?: string;
  message?: string;
  actions?: Array<Action>
}

export interface AppAlertHandle {
  open: (arg: OpenProps) => void;
  close: () => void;
}

export class Alert {
  private static alertRef: React.RefObject<AppAlertHandle> = createRef();

  static register(ref: React.RefObject<AppAlertHandle>) {
    this.alertRef = ref;
  }

  static open(arg: OpenProps) {
    this.alertRef.current?.open(arg);
  }

  static offLoading() {
    this.alertRef.current?.close();
  }
}

export const AppAlert = forwardRef<AppAlertHandle, AppAlertProps>((props, ref) => {
  const [open, setOpen] = useState(false);
  const [title, setTile] = useState('Thông báo');
  const [message, setMessage] = useState('')
  const [actions, setActions] = useState<Array<Action>>([])


  useImperativeHandle(ref, () => ({
    open: (arg) => {
      setOpen(true)
      if (arg?.title) setTile(arg.title);
      if (arg?.message) setMessage(arg.message);
      if (arg?.actions) setActions(arg.actions)
    },
    close: () => setOpen(false),
  }));


  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <div className={style.alert_cnt}>
        <p className={style.alert_title}>{title}</p>
        <p className={style.alert_message}>{message}</p>
        <div className={style.alert_action}>
          {
            actions.map((i, index) => (
              <Button
                key={index}
                variant="contained"
                style={{ background: i.type === 'cancel' ? '#ff8583':'var(--purple)', textTransform: "none", margin: '0px 6px' }}
                onClick={() => {
                  i.onPress();
                  setOpen(false)
                }}
              >
                {i.text}
              </Button>
            ))
          }
        </div>
      </div>
    </Dialog>
  );
});