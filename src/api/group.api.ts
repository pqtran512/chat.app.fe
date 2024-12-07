import { AddMembersDto, CreateGroupDto, GroupListDto, RemoveMembersDto, UpdateProfileGroupDto } from "src/types/api/dto";
import http from "src/utils/http";

export const GROUP_URL = {
  CREATE_GROUP: "/group",
  UPDATE_GROUP: "/group",
  GROUP_LIST: "/group-members/list-by-user",
  LEAVE_GROUP: "/group-members/leave-group",
  GET_MEMBERS: "/group-members/list-by-group",
  ADD_MEMBERS: "/group-members", 
  REMOVE_MEMBERS: "/group-members/remove-members",
  DELETE_GROUP: "/group",
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
  },

  getGroupMembers(group_id: string) {
    return http.get<any>(`${GROUP_URL.GET_MEMBERS}/${group_id}`)
  },

  addMembers(addMembersDto: AddMembersDto) {
    return http.post<any>(GROUP_URL.ADD_MEMBERS, addMembersDto)
  },

  removeMembers(removeMembersDto: RemoveMembersDto) {
    return http.post<any>(GROUP_URL.REMOVE_MEMBERS, removeMembersDto)
  },

  deleteGroup(id: string) {
    return http.delete<any>(`${GROUP_URL.DELETE_GROUP}/${id}`)
  }
};
