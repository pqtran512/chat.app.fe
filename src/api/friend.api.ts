import { AddFriendDto } from "src/types/api/dto";
import { AddFriendResponse } from "src/types/api/response";
import http from "src/utils/http";

export const FRIEND_URL = {
  FRIEND_LIST: '/friend',
  ADD_FRIEND: '/friend-request',
  FRIEND_SENT: '/friend-request/list-sent',
  FREIND_RECEIVED: '/friend-request/list-received',
  ACCEPT: '/friend-request/accept',
};

export const friendAPI = {
  friendList() {
    return http.get<any>(FRIEND_URL.FRIEND_LIST)
  },

  addFriend(addFriendDto: AddFriendDto) {
    return http.post<AddFriendResponse>(FRIEND_URL.ADD_FRIEND, addFriendDto)
  },

  friendSent() {
    return http.get<any>(FRIEND_URL.FRIEND_SENT)
  },

  friendRecieved() {
    return http.get<any>(FRIEND_URL.FREIND_RECEIVED)
  },

  accept(id: string) {
    return http.get<any>(`/friend-request/accept/${id}`)
  },

  decline(id: string) {
    return http.get<any>(`/friend-request/accept/${id}`)
  },
};