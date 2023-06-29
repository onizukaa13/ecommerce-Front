import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string | null = null;

  constructor(private http: HttpClient, private router: Router) { }

  login(credentials: any): Observable<any> {
    return this.http.post<any>('http://127.0.0.1:8000/api/login_check', credentials);
  }

  logout(): void {
    this.token = null;
    localStorage.removeItem('token');
    localStorage.removeItem('connectedUserEmail'); // Supprime le token du localStorage
  }

  setToken(token: string): void {
    this.token = token;
    localStorage.setItem('token', token); // Stocke le token dans le localStorage
  }

  getToken(): string | null {
    if (!this.token) {
      this.token = localStorage.getItem('token'); // Récupère le token depuis le localStorage
    }
    return this.token;
  }

  register(credentials: any): Observable<any> {
    return this.http.post<any>('http://127.0.0.1:8000/api/register', credentials);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getUserInfo(): Observable<any> {
    const token = this.getToken();
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.get<any>('http://127.0.0.1:8000/api/user', { headers });
  }

  haveRole(role: string) {
    const token = this.getToken();
    const { roles }: {roles:string[]} = jwt_decode(token as string);
    return roles.some(r=>r==role) 
     

  }

}

