import { User } from './User';

export interface Author {
  id: number;
  authorName: string;
  confirmed: boolean;
  createdAt: string;
  updatedAt: string;
  user: User;
}
