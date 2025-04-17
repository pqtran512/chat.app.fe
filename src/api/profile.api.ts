import { UpdateProfileDto } from "src/types/api/dto";
import http from "src/utils/http";

export const PROFILE_URL = {
  // GET_PROFILE: "/user/me/profiles",
  UPDATE_PROFILE: `/user/${localStorage.getItem('id')}/uploadAvatar`,
};

export const profileAPI = {
  // getprofile() {
  //   return http.get<any>(PROFILE_URL.GET_PROFILE);
  // },

  updateProfile(updateProfileDto: UpdateProfileDto) {
    return http.post<any>(PROFILE_URL.UPDATE_PROFILE, updateProfileDto)
  }
};
