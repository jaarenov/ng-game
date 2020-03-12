import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ok, error } from './utils';

let users = JSON.parse(localStorage.getItem('users')) || [];

@Injectable()
export class BackendInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const { body, url, method } = request;

    return of(null).pipe(
      mergeMap(() => {
        // 1 API Endpoint - Auth
        if (url.endsWith('/auth') && method === 'POST') {
          const { username, password } = body;
          const currentUser =
            users.find(el => el.username === username && el.password === password);

          if (currentUser) {
            return ok({
              id: currentUser.id,
              username: currentUser.username,
              firstName: currentUser.firstName,
              lastName: currentUser.lastName,
              token: 'fake-jwt',
            });
          } else return error('User was not found');
        }

        // 2 API Endpoint - Registration
        if (request.url.endsWith('/register') && method === 'POST') {
          let user = body;

          if (users.find(item => item.username === user.username)) {
            return error(`${user.username} has already been taken`);
          }

          user.id = users.length ? Math.max(...users.map(item => item.id)) + 1 : 1;
          users.push(user);
          localStorage.setItem('users', JSON.stringify(users));

          return ok({ ...user, token: 'fake-jwt' });
        }
      }
    ))
   }
  }

export let BackendProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: BackendInterceptor,
  multi: true,
};
