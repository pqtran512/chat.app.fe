export class UpdateProfileDto {
    profileId: string;
    fullname: string;
    avatar: string;
}

export class UpdateProfileGroupDto {
    id: string; 
    name: string;
    avatar: string;
    group_status_code: string;
    description: string;
}