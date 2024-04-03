interface IComment {
  id: string;
  content: string;
  songId: string;
  parentId?: string;
  replies: IComment[];
  count_reply: number;
}

export type { IComment };
