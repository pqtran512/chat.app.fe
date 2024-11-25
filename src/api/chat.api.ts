import { LogInDto, RefreshDto, ResetPassworDto } from "src/types/api/dto";
import { LoginResponse, ResetPasswordResponse } from "src/types/api/response";
import { ListChatBoxByUserResult } from "src/types/api/response/chatbox/list-chatbox-by-user.response";
import { Token } from "src/types/api/response/token.response";
import http from "src/utils/http";

export const  CHAT_URL = {  
  LIST_CHAT_BOX: "/chat-box"
};

export const chatAPI = {
  listChatBox() {
    return http.get<ListChatBoxByUserResult>(CHAT_URL.LIST_CHAT_BOX);
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