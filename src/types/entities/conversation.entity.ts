export class Conversation {
  id: number;
  type: string;
  creator_id: number;
  seen: boolean;
  latest_message_created_at: Date;
  participants: number[];
}
