import { LogInDto, RefreshDto } from "src/types/api/dto";
import { LoginResponse } from "src/types/api/response";
import { Token } from "src/types/api/response/token.response";
import http from "src/utils/http";

export const AUTH_URL = {
  LOGIN: '/auth/login',
  REFRESH: '/auth/refresh',
  CHECK_USER_EXIST: '/auth/check-user-exist'
};

export const authAPI = {
  login(loginDto: LogInDto) {
    return http.post<LoginResponse>(AUTH_URL.LOGIN, loginDto);
  },
  refresh(refreshDto: RefreshDto) {
    return http.post<Token>(AUTH_URL.REFRESH, refreshDto);
  },
  checkUserExist(phone: string) {
    return http.get<boolean>(`${AUTH_URL.CHECK_USER_EXIST}/${phone}`);
  }
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
};