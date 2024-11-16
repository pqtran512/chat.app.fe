import http from "src/utils/http";

export const GROUP_URL = {
  CREATE_GROUP: '/group',
};

export const groupAPI = {
  createGroup(nameGroup: string) {
    return http.post<any>(GROUP_URL.CREATE_GROUP, {name: nameGroup})
  },

  groupList() {
    
  }
};