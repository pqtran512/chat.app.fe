import { AddFriendDto, SearchFriendDto } from "src/types/api/dto";
import { AddFriendResponse } from "src/types/api/response";
import { FriendResponse } from "src/types/api/response/friend";
import { User } from "src/types/entities";
import http from "src/utils/http";

export const FRIEND_URL = {
  // FRIEND_LIST: '/friends',
  ADD_FRIEND: '/addFriend',
  FRIEND_SENT: '/sentFriendRequests',
  // FRIEND_REQUESTS: '/getFriendRequests',
  FREIND_RECEIVED: '/receivedFriendRequests',
  ACCEPT: '/acceptFriend',
  REJECT: '/rejectFriend',
  CANCEL: '/cancelFriendRequest',
  UNFRIEND: '/friend/delete',
};

export const friendAPI = {
  // friendList(userId: number) {
  //   return http.get<User[]>(`${FRIEND_URL.FRIEND_LIST}/${userId}`)
  // },

  addFriend(addFriendDto: AddFriendDto) {
    // return http.post<AddFriendResponse>(`${FRIEND_URL.ADD_FRIEND}/${userId}/:${friendId}`)
    return http.post<any>(`${FRIEND_URL.ADD_FRIEND}/${addFriendDto.userId}/${addFriendDto.friendId}`)
  },

  friendSent(userId: number) {
    return http.get<any>(`${FRIEND_URL.FRIEND_SENT}/${userId}`)
  },

  friendRecieved(userId: number) {
    return http.get<any>(`${FRIEND_URL.FREIND_RECEIVED}/${userId}`)
  },

  accept(addFriendDto: AddFriendDto) {
    return http.put<any>(`${FRIEND_URL.ACCEPT}/${addFriendDto.userId}/${addFriendDto.friendId}`)
  },

  reject(addFriendDto: AddFriendDto) {
    return http.put<any>(`${FRIEND_URL.REJECT}/${addFriendDto.userId}/${addFriendDto.friendId}`)
  },

  cancel(addFriendDto: AddFriendDto) {
    return http.delete<any>(`${FRIEND_URL.CANCEL}/${addFriendDto.userId}/${addFriendDto.friendId}`)
  },
  
  unfriend(id: string) {
    return http.delete<any>(`${FRIEND_URL.UNFRIEND}/${id}`)
  },

  searchFriend(search: string) {
    return http.get<User[]>(`user/${localStorage.getItem('id')}/friends`, {
      params: { search }
    })
  }
};