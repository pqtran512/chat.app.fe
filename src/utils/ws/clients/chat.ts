import { STORAGE_KEY } from "src/utils/constants";
import { WebSocketClient } from "..";
import { WsEvent } from "src/utils/enums";
import { ReceiveMessageDto } from "src/types/ws/dto/chat";

export const chatSocketClient = new WebSocketClient({
  uri: `${STORAGE_KEY.CHAT_SOCKET_BASE_URL}`
});

export function connectChatSocket() {
  console.log("Connecting to chat WebSocket...");
  chatSocketClient.connect();
}

export function disconnectChatSocket() {
  chatSocketClient.disconnect();
}

export function reconnectChatSocket() {
  chatSocketClient.reconnect();
}

export function onReceiveChat(callback?: (data: ReceiveMessageDto) => void) {
  chatSocketClient.on(WsEvent.RECEIVE_MESSAGE, (data: ReceiveMessageDto) => {
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
