import { Message } from './message';
import { User } from './user';

export interface Issue {
  id: number;
  title: string;
  description: string;
  place: string;
  user: User;
  labels: string[];
  messages?: Message[];
}
