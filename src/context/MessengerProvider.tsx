/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useContext, useEffect, useRef, useState, useCallback, useMemo, ReactNode } from "react";
import { io, Socket } from "socket.io-client";
import { useAuth, useGetAllTopic, useSwrInfinite } from "hooks";
import { IMessage, ITopic, ParamsPostMessage } from "interface";
import { paramsTopic } from "params-query";

const Events = {
  SUB: 'SUB',
  SUB_TOPIC: 'SUB_TOPIC',
  SUB_CHAT_TOPIC: 'SUB_CHAT_TOPIC',
  SEND_MSG: 'SEND_MSG',
  LISTENER_MSG: 'LISTENER_MSG',
  TYPING: 'TYPING'
};

export type DoTypingType = { typing: boolean; topic_id: string };
export type TypingType = { topic_id: string; typing: boolean; user: any };

export type MessengerCtxType = {
  connect: () => Socket<any, any>
  isConnected: boolean;
  doSubscribeTopic: (topic_id: string) => void;
  doMessage: (data: ParamsPostMessage) => void;
  doTyping: (data: DoTypingType) => void;
  onListenerMessage: (cb: (data: IMessage) => void) => () => void;
  onListenerTyping: (cb: (data: TypingType) => void) => () => void;
  disconnect: () => void;
  currTopic: (org_id: number) => ITopic | undefined;
};

export const MessengerContext = createContext<MessengerCtxType | null>(null);

export function MessengerProvider({ children }: { children: ReactNode }) {
  const { USER } = useAuth();
  const { topic_ids, isValidating } = useGetAllTopic();
  const socketRef = useRef<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  const connect = useCallback(() => {
    if (socketRef.current) return socketRef.current;

    const socket = io(String(process.env.REACT_APP_SOCKET_URL), {
      extraHeaders: { Authorization: `Bearer` },
      reconnection: true,
      reconnectionAttempts: 100,
      reconnectionDelay: 2000,
    });

    socket.on("connect", () => {
      console.log("Connected to WebSocket");
      socket.emit(Events.SUB, { user: USER, topic_ids });
      setIsConnected(true);
    });

    socket.on("connect_error", (err) => {
      console.error("WebSocket Connection Error:", err);
    });

    socketRef.current = socket;
    return socket;
  }, [USER, topic_ids]);

  useEffect(() => {
    if (USER?.id && !isValidating) {
      connect();
    }
    return () => {
      socketRef.current?.disconnect();
      socketRef.current = null;
      setIsConnected(false);
    };
  }, [USER?.id, isValidating, topic_ids.length]);

  const doSubscribeTopic = useCallback((topic_id: string) => {
    socketRef.current?.emit(Events.SUB_TOPIC, { user: USER, topic_id });
  }, [USER]);

  const doMessage = useCallback((data: ParamsPostMessage) => {
    socketRef.current?.emit(Events.SEND_MSG, {
      user: USER,
      message: {
        msg: data.msg,
        topic_id: data.topic_id,
        media_ids: data.media_ids,
        media_urls: data.media_urls,
        org_id: data.org_id,
      },
    });
  }, [USER]);

  const doTyping = useCallback((data: DoTypingType) => {
    socketRef.current?.emit(Events.TYPING, { user: USER, typing: data });
  }, [USER]);

  const onListenerMessage = useCallback((cb: (data: IMessage) => void) => {
    if (!socketRef.current) return () => { };
    socketRef.current.on(Events.LISTENER_MSG, cb);
    return () => socketRef.current?.off(Events.LISTENER_MSG, cb);
  }, []);

  const onListenerTyping = useCallback((cb: (data: TypingType) => void) => {
    if (!socketRef.current) return () => { };
    socketRef.current.on(Events.TYPING, cb);
    return () => socketRef.current?.off(Events.TYPING, cb);
  }, []);

  const disconnect = useCallback(() => {
    socketRef.current?.disconnect();
    socketRef.current = null;
    setIsConnected(false);
  }, []);

  const { resData } = useSwrInfinite({
    API_URL: 'topics',
    params: paramsTopic,
    enable: USER,
    dedupingInterval: 0,
  });
  const topics: ITopic[] = resData;

  const currTopic = useCallback((org_id: number) => {
    return topics.find(topic => topic.organization_id === org_id);
  }, [topics]);

  const value = useMemo(() => ({
    connect,
    isConnected,
    doSubscribeTopic,
    doMessage,
    doTyping,
    onListenerMessage,
    onListenerTyping,
    disconnect,
    currTopic,
  }), [
    connect,
    isConnected,
    doSubscribeTopic,
    doMessage,
    doTyping,
    onListenerMessage,
    onListenerTyping,
    disconnect,
    currTopic,
  ]);

  return (
    <MessengerContext.Provider value={value}>
      {children}
    </MessengerContext.Provider>
  );
}

//

type UseMessengerProviderOptions = {
  onListenerMsg?: (msg: IMessage) => void;
};

export function useMessengerProvider(options?: UseMessengerProviderOptions) {
  const context = useContext(MessengerContext) as MessengerCtxType;
  const [message, setMessage] = useState<IMessage | undefined>();

  const onDeleteMessage = () => setMessage(undefined);

  useEffect(() => {
    if (!context) return;
    let unsubscribe: (() => void) | undefined;
    const connectThenListen = async () => {
      try {
        if (!context.isConnected) {
          await context?.connect();
        }
        unsubscribe = context.onListenerMessage((msg: IMessage) => {
          setMessage(msg);
          options?.onListenerMsg?.(msg);
        });
      } catch (error) {
        console.error('Error connecting socket:', error);
      }
    };
    connectThenListen();
    return () => {
      unsubscribe?.();
    };
  }, [context, options?.onListenerMsg]);

  return {
    ...context,
    message,
    onDeleteMessage,
  };
}
