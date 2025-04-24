export class CreateGroupDto {
  type: string;
  name?: string;
  description?: string;
  creator_id: number;
  participants: number[];
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
