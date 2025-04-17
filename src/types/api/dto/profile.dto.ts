export class UpdateProfileDto {
    id: string;
    username: string;
    avatar: string;
}

export class UpdateProfileGroupDto {
    id: string; 
    name: string;
    avatar: string;
    group_status_code: string;
    description: string;
}