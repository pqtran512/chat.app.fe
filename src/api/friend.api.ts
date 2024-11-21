import { AddFriendDto } from "src/types/api/dto";
import { AddFriendResponse } from "src/types/api/response";
import http from "src/utils/http";

export const FRIEND_URL = {
  FRIEND_LIST: '/friend',
  ADD_FRIEND: '/friend-request',
  FRIEND_SENT: '/friend-request/list-sent',
  FREIND_RECEIVED: '/friend-request/list-received',
  ACCEPT: '/friend-request/accept',
  DECLINE: '/friend-request/decline',
  UNFRIEND: '/friend/delete',
  SEARCH_FRIEND: '/friend/find-by-text',
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
    return http.get<any>(`${FRIEND_URL.ACCEPT}/${id}`)
  },

  decline(id: string) {
    return http.get<any>(`${FRIEND_URL.DECLINE}/${id}`)
  },
  
  unfriend(id: string) {
    return http.delete<any>(`${FRIEND_URL.UNFRIEND}/${id}`)
  },

  searchFriend(text: string) {
    return http.post<any>(`${FRIEND_URL.SEARCH_FRIEND}/${text}`)
  }
};