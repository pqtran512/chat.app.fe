import { Profile, User } from "src/types/entities";
import http from "src/utils/http";

export const USER_URL = {
  FIND: "findUsers",
  // FIND_BY_PHONE: "user/find-by-phone",
  GET_DETAIL: "user"
};

export const userAPI = {
  // findByPhone(phone: string) {
  //   return http.get<User>(`${USER_URL.FIND_BY_PHONE}/${phone}`);
  // },
  // getPersonalProfile() {
  //   return http.get<Profile[]>(USER_URL.PERSONAL_PROFILE);
  // }
  findUser(search: string) {
    return http.get<{users: User[]}>(`user/${localStorage.getItem('id')}/${USER_URL.FIND}`, {
      params: { search }
    });
  },

  getDetail(userId: string) {
    return http.get<any>(`${USER_URL.GET_DETAIL}/${userId}`)
  },
};