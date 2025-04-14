import { AddFriendDto, SearchFriendDto } from "src/types/api/dto";
import { AddFriendResponse } from "src/types/api/response";
import { FriendResponse } from "src/types/api/response/friend";
import http from "src/utils/http";

export const FRIEND_URL = {
  FRIEND_LIST: '/friends',
  ADD_FRIEND: '/addFriend',
  FRIEND_SENT: '/sentFriendRequests',
  // FRIEND_REQUESTS: '/getFriendRequests',
  FREIND_RECEIVED: '/receivedFriendRequests',
  ACCEPT: '/acceptFriend',
  REJECT: '/rejectFriend',
  UNFRIEND: '/friend/delete',
  SEARCH_FRIEND: '/friend/find-by-text',
};

export const friendAPI = {
  friendList(userId: string) {
    return http.get<FriendResponse[]>(`FRIEND_URL.FRIEND_LIST/${userId}`)
  },

  addFriend(addFriendDto: AddFriendDto) {
    // return http.post<AddFriendResponse>(`${FRIEND_URL.ADD_FRIEND}/:${userId}/:${friendId}`)
    return http.post<any>(`${FRIEND_URL.ADD_FRIEND}/${addFriendDto.userId}/${addFriendDto.friendId}`)
  },

  friendSent(userId: string) {
    return http.get<any>(`${FRIEND_URL.FRIEND_SENT}/${userId}`)
  },

  friendRecieved(userId: string) {
    return http.get<any>(`${FRIEND_URL.FREIND_RECEIVED}/${userId}`)
  },

  accept(addFriendDto: AddFriendDto) {
    return http.put<any>(`${FRIEND_URL.ACCEPT}/${addFriendDto.userId}/${addFriendDto.friendId}`)
  },

  reject(addFriendDto: AddFriendDto) {
    return http.put<any>(`${FRIEND_URL.REJECT}/${addFriendDto.userId}/${addFriendDto.friendId}`)
  },
  
  unfriend(id: string) {
    return http.delete<any>(`${FRIEND_URL.UNFRIEND}/${id}`)
  },

  searchFriend(searchFriendDto: SearchFriendDto) {
    return http.post<any>(FRIEND_URL.SEARCH_FRIEND, searchFriendDto)
  }
};