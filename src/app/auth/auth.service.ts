import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { config } from '../api/config';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { User } from '../api/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
    constructor (private http: HttpClient) {}

    login(credentials): Observable<User[]> {
      return this.http.post<any>(`${config.apiUrl}/auth`, credentials).pipe(
        map(user => {
          if (user && user.token) {
            localStorage.setItem('currentUser', JSON.stringify(user));
          }
          return user;
        })
      )
    }
    
    register(user): Observable<User[]> {
      return this.http.post<any>(`${config.apiUrl}/register`, user);
    }

    logout() {
      localStorage.removeItem('currentUser');
    }
}
