import { Author } from './Author';
import { Category } from './Category';

export interface Article {
  id: number;
  title: string;
  content: string;
  image: string;
  status: string;
  source: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  authors: Author;
  category: Category;
}
