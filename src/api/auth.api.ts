import { LogInDto, RefreshDto, ResetPassworDto } from "src/types/api/dto";
import { LogOutDto, RegisterDto } from "src/types/api/dto/auth";
import { LoginResponse, ResetPasswordResponse } from "src/types/api/response";
import { Token } from "src/types/api/response/token.response";
import http from "src/utils/http";

export const AUTH_URL = {
  REGISTER: "/signup",
  LOGIN: "/login",
  REFRESH: "/refresh",
  CHECK_USER_EXIST: "/check-user-exist",
  LOGOUT: "/logout",
  CHECKPHONE: "/check-user-exist",
  RESETPASSWORD: "/reset-password",
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
  },
  logout(logOutDto: LogOutDto) {
    return http.post<boolean>(AUTH_URL.LOGOUT, logOutDto, {
      headers: {
        token: logOutDto.access_token,
      },
    });
  },
  checkphone(phone: string) {
    return http.get<boolean>(`${AUTH_URL.CHECKPHONE}/${phone}`);
  },
  resetpassword(resetPasswordDto: ResetPassworDto) {
    return http.post<ResetPasswordResponse>(
      AUTH_URL.RESETPASSWORD,
      resetPasswordDto
    );
  },
  register(registerDto: RegisterDto) {
    return http.post<ResetPasswordResponse>(AUTH_URL.REGISTER, registerDto);
  },
};
