import { HttpClient } from '@angular/common/http';
import { REQUEST } from '@nguniversal/express-engine/tokens';
import { Inject, Injectable } from '@angular/core';
import { User, UserRole } from './user';
import { Request } from 'express';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse extends User {
  token: string;
}

const UserStorageKey = 'user';
const TokenStorageKey = 'token';

@Injectable()
export abstract class AuthStorageService {
  abstract readUser(): User;
  abstract readToken(): string;
}

@Injectable()
export class BrowserAuthStorageService extends AuthStorageService {
  readUser(): User {
    return JSON.parse(sessionStorage.getItem(UserStorageKey));
  }
  readToken(): string {
    return sessionStorage.getItem(TokenStorageKey);
  }
}

@Injectable()
export class ServerAuthStorageService extends AuthStorageService {

  constructor(@Inject(REQUEST) private request: Request) {
    super();
  }

  readUser(): User {
    return JSON.parse(this.request.cookies[UserStorageKey]);
  }
  readToken(): string {
    return this.request.cookies?.[TokenStorageKey] ?? null;
  }
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUser: User;
  get user(): User {
    if (!this.currentUser) {
      this.currentUser = this.authStorageService.readUser();
    }
    return this.currentUser;
  }
  private currentToken: string;
  get token(): string {
    if (!this.currentToken) {
      this.currentToken = this.authStorageService.readToken();
    }
    return this.currentToken;
  }

  get isLoggedIn(): boolean {
    return !!this.token;
  }

  get isAdmin(): boolean {
    return this.user.role === UserRole.Admin;
  }

  constructor(private httpClient: HttpClient, private authStorageService: AuthStorageService) {}

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
      document.cookie = `${TokenStorageKey}=${user.token}`;
      document.cookie = `${UserStorageKey}=${JSON.stringify(user)}`;
    } else {
      sessionStorage.removeItem(TokenStorageKey);
      sessionStorage.removeItem(UserStorageKey);
    }
    this.currentUser = user;
    this.currentToken = user?.token;
  }
}
