import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interface/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {}

  getUserByEmail(email:string) {
    return this.http.get<Array<User>>('http://127.0.0.1:8000/api/users?email='+email);
  }

}