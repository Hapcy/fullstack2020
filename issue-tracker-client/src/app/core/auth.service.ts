import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User, UserRole } from './user';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse extends User {
  token: string;
}

const UserStorageKey = 'user';
const TokenStorageKey = 'token';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUser: User;
  get user(): User {
    if (!this.currentUser) {
      this.currentUser = JSON.parse(sessionStorage.getItem(UserStorageKey));
    }
    return this.currentUser;
  }
  private currentToken: string;
  get token(): string {
    if (!this.currentToken) {
      this.currentToken = sessionStorage.getItem(TokenStorageKey);
    }
    return this.currentToken;
  }

  get isLoggedIn(): boolean {
    return !!this.token;
  }

  get isAdmin(): boolean {
    return this.user.role === UserRole.Admin;
  }

  constructor(private httpClient: HttpClient) {}

  async login(loginRequest: LoginRequest): Promise<void> {
    const user = await this.httpClient
      .post<LoginResponse>('/api/user/login', loginRequest)
      .toPromise();
    this.setUser(user);
  }

  logout(): void {
    this.setUser(null);
  }

  private setUser(user: LoginResponse): void {
    if (user) {
      sessionStorage.setItem(TokenStorageKey, user.token);
      sessionStorage.setItem(UserStorageKey, JSON.stringify(user));
    } else {
      sessionStorage.removeItem(TokenStorageKey);
      sessionStorage.removeItem(UserStorageKey);
    }
    this.currentUser = user;
    this.currentToken = user?.token;
  }
}
