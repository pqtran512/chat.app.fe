import { platform } from "os";
import { GetChatBoxDetailDto, InsertChatLogDto } from "src/types/api/dto/chat";
import { CreateChatLogDto } from "src/types/api/dto/chat/create-chat.dto";
import { ListChatBoxByUserResult } from "src/types/api/response/chatbox";
import { ChatBox, ChatBoxChatLog, ChatLog, Group } from "src/types/entities";
import { Conversation } from "src/types/entities/conversation.entity";
import { Platform } from "src/utils/enums";
import http from "src/utils/http";

export const CHAT_URL = {
  LIST_CHAT_BOX: "/conversations",
  CHAT_DETAIL: "/messages",
  INSERT_CHAT_LOG: "/chat-log",
  JOIN_CHAT: "/ws/joinConversation",
  CREATE_CHAT: "/ws/createConversation",
  SET_CHATBOX_SEEN: "/chat-box/set-seen",
};

export const chatAPI = {
  listChatBox(userId: number) {
    return http.get<{ conversations: Conversation[] }>(`${CHAT_URL.LIST_CHAT_BOX}/${userId}`)
  },
  // chatDetail(getChatBoxDetailDto: GetChatBoxDetailDto) {
  //   return http.post<ChatBoxChatLog[]>(
  //     CHAT_URL.CHAT_DETAIL,
  //     getChatBoxDetailDto
  //   );
  // },
  chatDetail(chat_box_id: string) {
    return http.post<ChatBoxChatLog[]>(`${CHAT_URL.CHAT_DETAIL}/${chat_box_id}`);
  },
  insertChatlog(insertChatlogDto: InsertChatLogDto) {
    return http.post<ChatLog>(CHAT_URL.INSERT_CHAT_LOG, {
      ...insertChatlogDto,
      platform: Platform.WEB,
    });
  },
  // joinChat(chat_box_id: string) {
  //   return http.get<ChatLog>(`${CHAT_URL.JOIN_CHAT}/${chat_box_id}`);
  // },
  createChat(createChatDto: CreateChatLogDto) {
    return http.post<any>(CHAT_URL.CREATE_CHAT, {
      ...createChatDto,
    });
  },
  setChatboxSeen(chatboxId: string) {
    return http.get<boolean>(`${CHAT_URL.SET_CHATBOX_SEEN}/${chatboxId}`);
  },
};
