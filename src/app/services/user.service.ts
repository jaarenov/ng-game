import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { User } from '../interfaces/user';
import { config } from '../config';

@Injectable({ providedIn: 'root' })
export class UserService { 
  constructor( private http: HttpClient ) {}

  getData () {
    return this.http.get<User[]>(`${config.apiUrl}/users`);
  }
}