import { User } from "src/types/entities";
import http from "src/utils/http";

export const USER_URL = {
  FIND_BY_PHONE: "user/find-by-phone",
};

export const userAPI = {
  findByPhone(phone: string) {
    return http.get<User>(`${USER_URL.FIND_BY_PHONE}/${phone}`);
  },
};