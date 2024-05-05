import { IUser } from './User';

interface IComment {
  id: number;
  content: string;
  song_id: number;
  replies: IComment[];
  count_reply: number;
  parent_comment_id?: string;
  created_at: Date;
  updated_at: Date;
  user: IUser;
  status: boolean;
}

export type { IComment };
