import { Article } from './Article';

export interface Bookmark {
  id: number;
  createdAt: string;
  userId: number;
  article: Article;
}
