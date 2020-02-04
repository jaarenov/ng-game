import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { config } from '../config';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
    constructor (private http: HttpClient) {}

    // login
    login(username: string, password: string) {
        return this.http.post<any>(`${config.apiUrl}`, {username, password}).pipe(
          map(user => {
            if (user && user.jwt) {
              localStorage.setItem('currentUser', JSON.stringify(user));
            }
            return user;
          })
        )
    }
}