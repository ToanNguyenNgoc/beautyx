/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Drawer } from "@mui/material";
import { createRef, forwardRef, useImperativeHandle, useEffect, useState } from "react";
import style from './notification.module.css';
import img from 'constants/img';
import React from 'react';

interface PopupAction {
  text: string;
  onPress: () => void;
  type?: 'cancel' | 'success';
}

export interface PopupMessageProps {
  open: boolean;
  onClose?: () => void;
  onClick?: () => void;
  autoHide?: boolean;
  child?: React.ReactElement;
  content: string;
  iconLabel?: string;
  iconSize?: number;
  actions?: Array<PopupAction>;
}

export interface PopupMessageHandle {
  open: (props: Omit<PopupMessageProps, 'open'>) => void;
  close: () => void;
}

export class Popup {
  private static popupRef: React.RefObject<PopupMessageHandle> = createRef();

  static register(ref: React.RefObject<PopupMessageHandle>) {
    this.popupRef = ref;
  }

  static open(arg: Omit<PopupMessageProps, 'open'>) {
    this.popupRef.current?.open(arg);
  }

  static close() {
    this.popupRef.current?.close();
  }
}

export const PopupMessage = forwardRef<PopupMessageHandle, Partial<PopupMessageProps>>((props, ref) => {
  const [state, setState] = useState<PopupMessageProps>({
    open: false,
    content: '',
    onClose: undefined,
    onClick: undefined,
    autoHide: false,
    child: undefined,
    iconLabel: undefined,
    iconSize: undefined,
    actions: [],
  });

  // Update state if `props.open` changes from outside
  useEffect(() => {
    if (props.open !== undefined) {
      setState(prev => ({ ...prev, ...props }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.open]);

  useEffect(() => {
    if (state.autoHide && state.open) {
      const timer = setTimeout(() => {
        handleClose();
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [state.autoHide, state.open]);

  const reset = () => {
    setState({
      open: false,
      content: '',
      onClose: undefined,
      onClick: undefined,
      autoHide: false,
      child: undefined,
      iconLabel: undefined,
      iconSize: undefined,
      actions: [],
    });
  }
  useImperativeHandle(ref, () => ({
    open: (newProps) => {
      setState({ open: true, ...newProps });
    },
    close: () => reset(),
  }));

  const handleClose = () => {
    state.onClose?.();
    reset();
  };

  return (
    <Drawer open={state.open} onClose={handleClose} anchor="top">
      <div className={style.wrapper} onClick={() => { state?.onClick?.(); reset() }}>
        <div className={style.message_container}>
          <div className={style.message_left}>
            <img
              style={state.iconSize ? { width: state.iconSize, height: state.iconSize } : {}}
              className={style.message_left_icon}
              src={state.iconLabel ?? img.beautyx}
              alt=""
            />
          </div>
          <div className={style.message_right}>
            <div
              className={style.message_right_content}
              dangerouslySetInnerHTML={{ __html: state.content }}
            />
            {state.child && (
              <div className={style.message_right_bot}>
                {state.child}
              </div>
            )}
            {state.actions && state.actions.length > 0 && (
              <div className={style.alert_action}>
                {state.actions.map((action, index) => (
                  <Button
                    key={index}
                    variant="contained"
                    style={{
                      background: action.type === 'cancel' ? '#ff8583' : 'var(--purple)',
                      textTransform: 'none',
                      margin: '0 6px',
                    }}
                    onClick={() => {
                      action.onPress();
                      setState(prev => ({ ...prev, open: false }));
                    }}
                  >
                    {action.text}
                  </Button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Drawer>
  );
});
