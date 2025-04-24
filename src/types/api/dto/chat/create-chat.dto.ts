export class CreateChatLogDto {
  type: string;
  name?: string;
  description?: string;
  creator_id: number;
  participants: number[];
}
