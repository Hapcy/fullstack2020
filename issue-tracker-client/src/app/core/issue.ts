export interface Issue {
  id: number;
  title: string;
  description: string;
  user: string;
  labels: string[];
  messages?: Message[];
}
