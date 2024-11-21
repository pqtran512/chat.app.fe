import { CreateGroupDto, GroupListDto } from "src/types/api/dto";
import http from "src/utils/http";

export const GROUP_URL = {
  CREATE_GROUP: "/group",
  GROUP_LIST: "/group-members/list-by-user"
};

export const groupAPI = {
  createGroup(createGroupDto: CreateGroupDto) {
    return http.post<any>(GROUP_URL.CREATE_GROUP, createGroupDto);
  },

  groupList(groupListDto: GroupListDto) {
    return http.post<any>(GROUP_URL.GROUP_LIST, groupListDto)
  },
};
