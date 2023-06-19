 import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string | null = null;

  constructor(private http: HttpClient, private router: Router) {}

  login(credentials: any): Observable<any> {
    return this.http.post<any>('http://127.0.0.1:8000/api/login_check', credentials);
  }
  
  logout(): void {
    this.token = null;
    localStorage.removeItem('token'); // Supprime le token du localStorage
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
}
