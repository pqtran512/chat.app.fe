import { GetChatBoxDetailDto } from "src/types/api/dto/chat";
import { ListChatBoxByUserResult } from "src/types/api/response/chatbox";
import { ChatBoxChatLog } from "src/types/entities";
import http from "src/utils/http";

export const  CHAT_URL = {  
  LIST_CHAT_BOX: "/chat-box",
  CHAT_DETAIL: 'chat/detail'
};

export const chatAPI = {
  listChatBox() {
    return http.get<ListChatBoxByUserResult>(CHAT_URL.LIST_CHAT_BOX);
  },
  chatDetail(getChatBoxDetailDto: GetChatBoxDetailDto) {
    return http.post<ChatBoxChatLog[]>(CHAT_URL.CHAT_DETAIL, getChatBoxDetailDto);
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