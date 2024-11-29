import { CreateGroupDto, GroupListDto, UpdateProfileGroupDto } from "src/types/api/dto";
import http from "src/utils/http";

export const GROUP_URL = {
  CREATE_GROUP: "/group",
  GROUP_LIST: "/group-members/list-by-user",
  LEAVE_GROUP: "/group-members/leave-group",
  UPDATE_GROUP: "/group",
};

export const groupAPI = {
  createGroup(createGroupDto: CreateGroupDto) {
    return http.post<any>(GROUP_URL.CREATE_GROUP, createGroupDto);
  },

  groupList(groupListDto: GroupListDto) {
    return http.post<any>(GROUP_URL.GROUP_LIST, groupListDto)
  },

  leaveGroup(id: string) {
    return http.get<any>(`${GROUP_URL.LEAVE_GROUP}/${id}`)
  },

  updateGroup(updateGroupDto: UpdateProfileGroupDto) {
    return http.put<any>(GROUP_URL.UPDATE_GROUP, updateGroupDto)
  }
};
