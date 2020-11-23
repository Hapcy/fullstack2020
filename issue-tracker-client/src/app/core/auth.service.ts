import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface LoginRequest {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private currentToken: string;
  get token(): string {
    return this.currentToken;
  }

  get isLoggedIn(): boolean {
    return !!this.token;
  }

  constructor(private httpClient: HttpClient) {}

  async login(loginRequest: LoginRequest): Promise<void> {
    const token = await this.httpClient
      .post('/api/user/login', loginRequest, { responseType: 'text' })
      .toPromise();
    this.setToken(token);
  }

  private setToken(token: string): void {
    this.currentToken = token;
  }
}
