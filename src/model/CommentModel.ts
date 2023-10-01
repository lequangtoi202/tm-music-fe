import { Article } from './Article';

export interface CommentModel {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  userId: number;
  parentId: CommentModel;
  article: Article;
}
