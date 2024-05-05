interface IComment {
  id: number;
  content: string;
  song_id: number;
  user_id: number;
  parent_comment_id?: string;
  created_at: Date;
  updated_at: Date;
  created_by: object;
  status: boolean;
}

export type { IComment };
