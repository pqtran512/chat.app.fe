import { GetChatBoxDetailDto, InsertChatLogDto } from "src/types/api/dto/chat";
import { ListChatBoxByUserResult } from "src/types/api/response/chatbox";
import { ChatBoxChatLog, ChatLog } from "src/types/entities";
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
    return http.post<ChatLog>(CHAT_URL.INSERT_CHAT_LOG, insertChatlogDto);
  },
  setChatboxSeen(chatboxId: string) {
    return http.get<boolean>(`${CHAT_URL.SET_CHATBOX_SEEN}/${chatboxId}`);
  },
  // refresh(refreshDto: RefreshDto) {
  //   return http.post<Token>(AUTH_URL.REFRESH, refreshDto);
  // },
  // checkUserExist(phone: string) {
  //   return http.get<boolean>(`${AUTH_URL.CHECK_USER_EXIST}/${phone}`);
  // },
  // logout() {
  //   return http.post<any>(AUTH_URL.LOGOUT);
  // },
  // checkphone(phone: string) {
  //   // return http.post<CheckPhoneResponse>(`/auth/check-user-exist/${phone}`)
  //   return http.get<boolean>(`/auth/check-user-exist/${phone}`);
  // },
  // resetpassword(resetPasswordDto: ResetPassworDto) {
  //   return http.post<ResetPasswordResponse>(
  //     AUTH_URL.RESETPASSWORD,
  //     resetPasswordDto
  //   );
  // },
};
