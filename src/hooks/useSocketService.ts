/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import { useAuth } from "./useAuth";
import { useGetAllTopic } from "./useGetAllTopic";
import { io, Socket } from "socket.io-client";
import { IMessage, ParamsPostMessage } from "interface";

const Events = {
  SUB: 'SUB',
  SUB_TOPIC: 'SUB_TOPIC',
  SEND_MSG: 'SEND_MSG',
  LISTENER_MSG: 'LISTENER_MSG',
  TYPING: 'TYPING'
}

export type DoTypingType = { typing: boolean, topic_id: string }
export type TypingType = { topic_id: string, typing: boolean, user: any }

export function useSocketService() {
  const { USER: user } = useAuth();
  const { topic_ids, isValidating } = useGetAllTopic();
  const socketRef = useRef<Socket | null>(null);
  const connect = async () => {
    if (socketRef.current) return socketRef.current;
    return new Promise<Socket>((resolve, reject) => {
      try {
        socketRef.current = io(String(process.env.REACT_APP_SOCKET_URL), {
          // socketRef.current = io('http://localhost:3004', {
          extraHeaders: {
            Authorization: `Bearer`,
          },
          reconnection: true,
          reconnectionAttempts: 100,
          reconnectionDelay: 2000,
        });
        socketRef.current.on("connect", () => {
          console.log("Connected to WebSocket");
          socketRef.current!.emit(Events.SUB, { user, topic_ids });
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
    if (user?.id && !isValidating) {
      connect()
    }
  }, [user?.id, isValidating, topic_ids.length])
  //
  useEffect(() => {
    if (socketRef.current && socketRef.current.connected) {
      socketRef.current.emit(Events.SUB, { user, topic_ids });
    }
  }, [topic_ids]);

  const disconnect = () => {
    if (socketRef.current) {
      socketRef.current.disconnect();
      socketRef.current = null;
    }
  };


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
    socketRef.current.emit(Events.SUB_TOPIC, { user, topic_id });
  }
  const doMessage = (data: ParamsPostMessage) => {
    if (!socketRef.current) return;
    socketRef.current.emit(Events.SEND_MSG, {
      user,
      message: { msg: data.msg, topic_id: data.topic_id, media_ids: data.media_ids, media_urls: data.media_urls, org_id: data.org_id }
    });
  };
  const doTyping = (data: DoTypingType) => {
    if (!socketRef.current) return;
    socketRef.current.emit(Events.TYPING, {
      user,
      typing: data
    })
  }
  return {
    user, topic_ids,
    connect,
    doMessage,
    onListenerMessage,
    doSubscribeTopic,
    doTyping,
    onListenerTyping,
    disconnect
  }
}

type GetMessageChatGlobalOptions = {
  onListenerMsg?: (msg: IMessage) => void;
}
export function useGetMessageChatGlobal(options?: GetMessageChatGlobalOptions) {
  const [message, setMessage] = useState<IMessage>();
  const { user, connect, onListenerMessage, disconnect } = useSocketService();
  useEffect(() => {
    let unsubscribeMessage: (() => void) | undefined;
    const onListener = async () => {
      await connect();
      unsubscribeMessage = onListenerMessage((msg: IMessage) => {
        options?.onListenerMsg?.(msg);
        setMessage(msg);
      });
    };
    if (user?.id) {
      onListener();
    }
    return () => {
      unsubscribeMessage?.();
    };
  }, [user?.id]);
  return {
    disconnect,
    message,
    setMessage
  }
}