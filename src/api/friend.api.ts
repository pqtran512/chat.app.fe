import { AddFriendDto } from "src/types/api/dto";
import { AddFriendResponse } from "src/types/api/response";
import http from "src/utils/http";

export const FRIEND_URL = {
  ADD_FRIEND: '/friend-request',
  FRIEND_SENT: '/friend-request/list-sent',
};

export const friendAPI = {
  addFriend(addFriendDto: AddFriendDto) {
    return http.post<AddFriendResponse>(FRIEND_URL.ADD_FRIEND, addFriendDto)
  },

  friendSent() {
    return http.get<any>(FRIEND_URL.FRIEND_SENT)
  }

};