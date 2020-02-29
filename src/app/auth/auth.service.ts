import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { config } from '../api/config';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { User } from '../api/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
    constructor (private http: HttpClient) {}

    // Login
    login(username: string, password: string): Observable<User[]> {
      return this.http.post<any>(`${config.apiUrl}/auth`, { username, password }).pipe(
        tap(v => console.warn('>>> auth api response: ', v)),
        map(user => {
          if (user && user.token) {
            localStorage.setItem('user', JSON.stringify(user));
          }
          return user;
        })
      )
    }

    // Logout
    logout() {
      // localStorage.removeItem('user');
    }
}
