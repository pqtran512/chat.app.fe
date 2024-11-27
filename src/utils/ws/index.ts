import { io, ManagerOptions, Socket, SocketOptions } from "socket.io-client";
import { WsEvent } from "../enums";
import { STORAGE_KEY } from "../constants";
import { authAPI } from "src/api";
// import { LOCAL_STORAGE_KEY } from './constants';
// import { CHAT_SOCKET_EVENT, refreshTokenApi } from 'utils';
// import { message } from 'components';
// import { ResponseDto } from 'types';

export type SocketClientOptions = {
  uri: string;
} & Partial<ManagerOptions & SocketOptions>;

export class SocketClient {
  protected _socket: Socket;
  private refreshCount = 5;
  constructor(options: SocketClientOptions) {
    this._socket = io(options.uri, options);
    this._socket.on(WsEvent.CONNECT, () => {
      console.log("Socket is connected successfully");
      this.refreshCount = 5;
    });
    this._socket.on(WsEvent.DISCONNECT, () => {
      console.log("Socket is disconnected");
    });
    this._socket.on(WsEvent.EXCEPTION, (error: any) => {
      // message.systemError(error.message);
      console.log('exception', error.message);
      console.log(error);
    });
    this._socket.on(WsEvent.UNAUTHORIZED, () => {
      console.log("Socket is disconnect due to token is expired");
      this.refreshCount -= 1;
      this.reconnect();
    });
    this._socket.on(WsEvent.TOKEN_EXPIRED, () => {
      console.log("Socket token is expiring, refreshing ...");
      this.renewToken();
    });
    this._socket.on(WsEvent.ERROR, (error) => {
      console.log('error', error.message);
      if (error.message === WsEvent.UNAUTHORIZED) {
        this.refreshCount -= 1;
        this.reconnect();
      } else {
        console.error(error);
      }
    });
  }

  connect() {
    const accessToken = localStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);
    if (accessToken) {
      this.socket.auth = {
        token: accessToken,
      };
      this._socket.connect();
    }
  }

  disconnect() {
    this._socket.disconnect();
  }

  get socket() {
    return this._socket;
  }

  async reconnect() {
    const refresh_token = localStorage.getItem(STORAGE_KEY.REFRESH_TOKEN);
    const id = localStorage.getItem(STORAGE_KEY.ID);

    if (id && refresh_token) {
      const responseToken = await authAPI.refresh({
        id,
        refresh_token,
        is_new_refresh_token: false,
      });

      if (responseToken?.data.access_token) {
        this.socket.auth = {
          token: responseToken?.data.access_token,
        };
        this.connect();
      }
    }
  }

  async renewToken() {
    // const refreshToken = localStorage.getItem(LOCAL_STORAGE_KEY.REFRESH_TOKEN);

    // if (refreshToken) {
    //   const responseToken = await refreshTokenApi(refreshToken);

    //   if (responseToken?.data.accessToken) {
    //     const accessToken = responseToken.data.accessToken;
    //     this._socket.auth = {
    //       token: accessToken,
    //     };
    //     this._socket.emit(CHAT_SOCKET_EVENT.UPDATE_TOKEN, accessToken);
    //   }
    // }
  }
}
