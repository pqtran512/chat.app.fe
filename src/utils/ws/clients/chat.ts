import { STORAGE_KEY } from "src/utils/constants";
import { WebSocketClient } from "..";
import { WsEvent } from "src/utils/enums";
import { ReceiveMessageDto } from "src/types/ws/dto/chat";

export const chatSocketClient = new WebSocketClient({
  uri: `${STORAGE_KEY.CHAT_SOCKET_BASE_URL}`
});

export function connectChatSocket(chat_box_id: string) {
  console.log("Connecting to chat WebSocket...");
  chatSocketClient.connect(chat_box_id);
}

export function disconnectChatSocket() {
  chatSocketClient.disconnect();
}

export function reconnectChatSocket(chat_box_id: string) {
  chatSocketClient.reconnect(chat_box_id);
}

export function onReceiveChat(callback?: (data: ReceiveMessageDto) => void) {
  // chatSocketClient.on(WsEvent.RECEIVE_MESSAGE, (data: ReceiveMessageDto) => {
  //   callback?.(data);
  //   console.log("Received chat message:", data);
  // });
  chatSocketClient.on("default", (data) => {
    console.log("Received message (no event field):", data);
    callback?.(data);
  });
}

export function offReceiveChat() {
  chatSocketClient.off(WsEvent.RECEIVE_MESSAGE);
}

export function onJoinChat(callback: (data: any) => void) {
  chatSocketClient.on("joinChatResponse", callback);
}

export function offJoinChat() {
  chatSocketClient.off("joinChatResponse");
}
