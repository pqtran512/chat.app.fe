import { User } from "src/types/entities/user.entity";

export class Conversation {
  id: number;
  name: string;
  type: string;
  creator_id: number;
  seen: boolean;
  latest_message_created_at: string;
  latest_message_content: string;
  latest_message_sender_name: string;
  participants: User[];
}
