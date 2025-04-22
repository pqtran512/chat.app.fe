import axios from "axios";
import { UpdateProfileDto } from "src/types/api/dto";
import http from "src/utils/http";

export const PROFILE_URL = {
  // GET_PROFILE: "/user/me/profiles",
  UPDATE_PROFILE: `http://localhost:5050/user/${localStorage.getItem('id')}/uploadAvatar`,
};

export const profileAPI = {
  // getprofile() {
  //   return http.get<any>(PROFILE_URL.GET_PROFILE);
  // },

  // updateProfile(updateProfileDto: FormData) {
  //   return http.post<any>(PROFILE_URL.UPDATE_PROFILE, updateProfileDto)
  // }
  updateProfile: (formData: FormData) =>
    axios.post(PROFILE_URL.UPDATE_PROFILE, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      timeout: 20000,
    }),
  
};
