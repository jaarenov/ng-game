import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { config } from '../config';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { User } from '../interfaces/user';

@Injectable({ providedIn: 'root' })
export class AuthService {
    constructor (private http: HttpClient) {}

    // login
    login(username: string, password: string): Observable<User[]> {
      return this.http.post<any>(`${config.apiUrl}/auth`, { username, password }).pipe(

          map(user => {
            console.log('>>> auth login() ', user);
            if (user && user.token) {
              localStorage.setItem('currentUser', JSON.stringify(user));
            }
            return user;
          })
        )
    }

    logout() {
      localStorage.removeItem('currentUser');
    }
}