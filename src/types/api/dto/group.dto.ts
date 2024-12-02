export class CreateGroupDto {
  name: string;
  description: string;
  user_ids: string[];
}

export class GroupListDto {
  searchText: string
}

export class AddMembersDto {
  group_id: string;
  user_ids: string[];
}

export class RemoveMembersDto {
  group_id: string;
  user_ids: string[];
}
