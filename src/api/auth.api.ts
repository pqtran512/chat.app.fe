import { LogInDto, ResetPassworDto } from "src/types/api/dto";
import { LoginResponse, ResetPasswordResponse } from "src/types/api/response";
import http from "src/utils/http";

export const AUTH_URL = {
  LOGIN: '/auth/login',
  CHECKPHONE: '/auth/check-user-exist',
  RESETPASSWORD: '/auth/reset-password'
};

export const authAPI = {
  login(loginDto: LogInDto) {
    return http.post<LoginResponse>(AUTH_URL.LOGIN, loginDto);
  },
  // findAll(params?: FindAllOptionDto) {
  //   return http.post<OptionResponse[]>(OPTIONS_URL.FIND, params);
  // },
  // create(payload: CreateOptionDto) {
  //   return http.post<OptionResponse>(OPTIONS_URL.CREATE, payload);
  // },
  // update(id: string, payload: CreateOptionDto) {
  //   return http.patch<OptionResponse>(`${OPTIONS_URL.UPDATE}/${id}`, payload);
  // },
  // delete(id: string) {
  //   return http.delete<void>(`${OPTIONS_URL.DELETE}/${id}`);
  // },

    checkphone(phone: string) {
      // return http.post<CheckPhoneResponse>(`/auth/check-user-exist/${phone}`)
      return http.get<boolean>(`/auth/check-user-exist/${phone}`)
    },

    resetpassword(resetPasswordDto: ResetPassworDto) {
      return http.post<ResetPasswordResponse>(AUTH_URL.RESETPASSWORD, resetPasswordDto)
    }
};