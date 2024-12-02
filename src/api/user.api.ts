import { Profile, User } from "src/types/entities";
import http from "src/utils/http";

export const USER_URL = {
  FIND_BY_PHONE: "user/find-by-phone",
  PERSONAL_PROFILE: "user/me/profiles"
};

export const userAPI = {
  findByPhone(phone: string) {
    return http.get<User>(`${USER_URL.FIND_BY_PHONE}/${phone}`);
  },
  getPersonalProfile() {
    return http.get<Profile[]>(USER_URL.PERSONAL_PROFILE);
  }
};