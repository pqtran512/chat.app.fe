import { STORAGE_KEY } from "src/utils/constants";
import { SocketClient } from "..";
import { WsEvent } from "src/utils/enums";
import { ReceiveMessageDto } from "src/types/ws/dto/chat";

export const chatSocketClient = new SocketClient({
  uri: `${STORAGE_KEY.CHAT_SOCKET_BASE_URL}`,
  transports: ['websocket'],
  auth: {
    token: localStorage.getItem(STORAGE_KEY.ACCESS_TOKEN)
  }
});

export async function connectChatSocket() {
  chatSocketClient.connect();
}

export async function disconnectChatSocket() {
  chatSocketClient.disconnect();
}

export async function reconnectChatSocket() {
  chatSocketClient.reconnect();
}

export function onReceiveChat(callback?: (data: ReceiveMessageDto) => void) {
  chatSocketClient.socket.on(WsEvent.RECEIVE_MESSAGE, (data: ReceiveMessageDto) => {
    callback?.(data);
  });
}

export function offReceiveChat() {
  chatSocketClient.socket.off(WsEvent.RECEIVE_MESSAGE);
}