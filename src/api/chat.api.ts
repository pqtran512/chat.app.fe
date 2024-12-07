import { platform } from "os";
import { GetChatBoxDetailDto, InsertChatLogDto } from "src/types/api/dto/chat";
import { ListChatBoxByUserResult } from "src/types/api/response/chatbox";
import { ChatBoxChatLog, ChatLog } from "src/types/entities";
import { Platform } from "src/utils/enums";
import http from "src/utils/http";

export const CHAT_URL = {
  LIST_CHAT_BOX: "/chat-box",
  CHAT_DETAIL: "chat/detail",
  INSERT_CHAT_LOG: "/chat-log",
  SET_CHATBOX_SEEN: "/chat-box/set-seen",
};

export const chatAPI = {
  listChatBox() {
    return http.get<ListChatBoxByUserResult>(CHAT_URL.LIST_CHAT_BOX);
  },
  chatDetail(getChatBoxDetailDto: GetChatBoxDetailDto) {
    return http.post<ChatBoxChatLog[]>(
      CHAT_URL.CHAT_DETAIL,
      getChatBoxDetailDto
    );
  },
  insertChatlog(insertChatlogDto: InsertChatLogDto) {
    return http.post<ChatLog>(CHAT_URL.INSERT_CHAT_LOG, {
      ...insertChatlogDto,
      platform: Platform.WEB,
    });
  },
  setChatboxSeen(chatboxId: string) {
    return http.get<boolean>(`${CHAT_URL.SET_CHATBOX_SEEN}/${chatboxId}`);
  },
};
