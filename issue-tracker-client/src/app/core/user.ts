export interface User {
  id: number;
  username: string;
  role: string;
}

export enum UserRole {
  Guest = 'GUEST',
  User = 'USER',
  Admin = 'ADMIN',
}
