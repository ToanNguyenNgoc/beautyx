/* eslint-disable react-hooks/exhaustive-deps */
import { useAuth, useGetAllTopic, useSwrInfinite } from "hooks";
import { IMessage, ITopic, ParamsPostMessage } from "interface";
import { paramsTopic } from "params-query";
import { ReactNode, createContext, useContext, useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

const Events = {
  SUB: 'SUB',
  SUB_TOPIC: 'SUB_TOPIC',
  SEND_MSG: 'SEND_MSG',
  LISTENER_MSG: 'LISTENER_MSG',
  TYPING: 'TYPING'
}
export type DoTypingType = { typing: boolean, topic_id: string }
export type TypingType = { topic_id: string, typing: boolean, user: any }

export type MessengerCtxType = {
  isConnected: boolean;
  doSubscribeTopic: (topic_id: string) => void;
  doMessage: (data: ParamsPostMessage) => void
  doTyping: (data: DoTypingType) => void;
  onListenerMessage: (cb: (data: any) => void) => (() => Socket<any, any> | undefined) | undefined;
  onListenerTyping: (cb: (data: TypingType) => void) => (() => Socket<any, any> | undefined) | undefined;
  disconnect: () => void

  currTopic: (org_id: number) => ITopic | undefined,
}
export const MessengerContext = createContext<MessengerCtxType | null>(null);
export function MessengerProvider({ children }: { children: ReactNode }) {
  const { USER } = useAuth()
  // const { echo } = useContext(AppContext) as AppContextType
  // useEffect(() => {
  //   if (echo) {
  //     let chat: any = echo?.private(`chat`)
  //       .subscribed(() => {
  //         chat.whisper('connected', {
  //           user: {
  //             id: USER.id,
  //             fullname: USER.fullname,
  //             avatar: USER.avatar
  //           }, socketId: echo?.socketId()
  //         })
  //         chat.listenForWhisper('typing', (u: any) => { })
  //       })
  //       .listen('UserOnline', (u: any) => { })
  //       .listen('UserOffline', (u: any) => { })
  //   }
  // }, [echo, USER])
  const [isConnected, setIsConnected] = useState(false);
  const { topic_ids, isValidating } = useGetAllTopic();
  const socketRef = useRef<Socket | null>(null);
  const connect = async () => {
    if (socketRef.current) return socketRef.current;
    return new Promise<Socket>((resolve, reject) => {
      try {
        socketRef.current = io(String(process.env.REACT_APP_SOCKET_URL), {
          extraHeaders: {
            Authorization: `Bearer`,
          },
          reconnection: true,
          reconnectionAttempts: 100,
          reconnectionDelay: 2000,
        });
        socketRef.current.on("connect", () => {
          console.log("Connected to WebSocket");
          socketRef.current!.emit(Events.SUB, { user: USER, topic_ids });
          resolve(socketRef.current!);
        });

        socketRef.current.on("connect_error", (err) => {
          console.error("WebSocket Connection Error:", err);
          reject(err);
        });
      } catch (error) {
        console.error("WebSocket Exception:", error);
        reject(error);
      }
    });
  };
  useEffect(() => {
    const initConnect = async () => {
      if (await connect()) {
        setIsConnected(true);
      }
    }
    if (USER?.id && !isValidating) {
      initConnect();
    }
  }, [USER?.id, isValidating, topic_ids.length])
  //
  useEffect(() => {
    if (socketRef.current && socketRef.current.connected) {
      socketRef.current.emit(Events.SUB, { user: USER, topic_ids });
    }
  }, [topic_ids]);
  //
  const disconnect = () => {
    if (socketRef.current) {
      socketRef.current.disconnect();
      socketRef.current = null;
    }
  };
  //
  const onListenerMessage = (cb: (data: any) => void) => {
    if (!socketRef.current) return;
    socketRef.current.on(Events.LISTENER_MSG, cb);
    return () => socketRef.current?.off(Events.LISTENER_MSG, cb);
  }
  const onListenerTyping = (cb: (data: TypingType) => void) => {
    if (!socketRef.current) return;
    socketRef.current.on(Events.TYPING, cb);
    return () => socketRef.current?.off(Events.TYPING, cb);
  }
  //
  const doSubscribeTopic = (topic_id: string) => {
    if (!socketRef.current) return;
    socketRef.current.emit(Events.SUB_TOPIC, { user: USER, topic_id });
  }
  const doMessage = (data: ParamsPostMessage) => {
    if (!socketRef.current) return;
    socketRef.current.emit(Events.SEND_MSG, {
      user: USER,
      message: { msg: data.msg, topic_id: data.topic_id, media_ids: data.media_ids, media_urls: data.media_urls, org_id: data.org_id }
    });
  };
  const doTyping = (data: DoTypingType) => {
    if (!socketRef.current) return;
    socketRef.current.emit(Events.TYPING, {
      user: USER,
      typing: data
    })
  }


  //
  const { resData } = useSwrInfinite({
    API_URL: 'topics',
    params: paramsTopic,
    enable: USER,
    dedupingInterval: 0
  })
  const topics: ITopic[] = resData
  const currTopic = (org_id: number) => {
    return topics.find(i => i.organization_id === org_id)
  }
  const value = {
    isConnected,
    currTopic,
    doSubscribeTopic,
    doMessage, onListenerMessage,
    doTyping, onListenerTyping,
    disconnect,
  }
  return <MessengerContext.Provider value={value} > {children} </MessengerContext.Provider>
}

type UseMessengerProviderOptions = {
  onListenerMsg?: (msg: IMessage) => void;
}
export function useMessengerProvider(options?: UseMessengerProviderOptions) {
  const context = useContext(MessengerContext) as MessengerCtxType;
  const [message, setMessage] = useState<IMessage | undefined>();

  const onDeleteMessage = () => setMessage(undefined);
  
  useEffect(() => {
    if (!context?.isConnected) return;

    const handleMessage = (msg: IMessage) => {
      setMessage(msg);
      options?.onListenerMsg?.(msg);
    };

    const unsubscribe = context.onListenerMessage?.(handleMessage);

    return () => {
      unsubscribe?.();
    };
  }, [context.isConnected]);

  return {
    ...context,
    message,
    onDeleteMessage,
  };
}