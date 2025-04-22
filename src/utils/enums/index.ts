export enum TabsEnum {
  CHAT = 'chat',
  CONTACT = 'contact',
}

export enum ChatLogContentTypeCode {
  TEXT = 'text',
  IMAGE = 'image',
  VIDEO = 'video',
}

export enum WsEvent {
  RECEIVE_MESSAGE = 'message',
  CONNECT = 'connect',
  DISCONNECT = 'disconnect',
  UNAUTHORIZED = 'unauthorized',
  TOKEN_EXPIRED = 'token_expired',
  UPDATE_TOKEN = 'update_token',
  CONNECT_ERROR = 'connect_error',
  ERROR = 'error',
  EXCEPTION = 'exception',
}

export enum GroupStatusCode {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}
  
export enum Platform {
  MOBILE = 'mobile',
  WEB = 'web',
}