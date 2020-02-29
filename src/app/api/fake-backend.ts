import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS, HttpResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { User } from './user.model';

let users = JSON.parse(localStorage.getItem('users')) || [];

@Injectable()
export class BackendInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const { body, url, method, headers } = request;

    return of(null).pipe(
      mergeMap(() => {
        // 1 API Endpoint - Auth
        if (url.endsWith('/auth') && method === 'POST') {
          console.log('>>> /auth', body);
          const { username, password } = body;

          if(users.find(el => el.username === username && el.password === password)) {
            return ok({
              username: username,
              // firstName: this.firstName,
              // lastName: this.lastName,
              token: 'fake-jwt',
            });
          } else return error({status: 404, message: 'Usernme has benn already taken'});
        }

        // 2 API Endpoint - Registration
        if (request.url.endsWith('/register') && method === 'POST') {
          const { user: User } = body;

          if(users.find(el => el === user.username)) error({ message: 'Already registered user' });
          user.id = users.length + 1; 
          // user.id = users.length ? Math.max(...users.map(x => x.id)) + 1 : 1;
          users.push(user);
          localStorage.setItem('users', JSON.stringify(users));
        }


        function ok(body?) {
          return of(new HttpResponse({ status: 200, body }));
        }

        function error(status?, message?) {
          return throwError({ status, message }); 
        }

        // function isLoggedIn() {
        //   return (headers.get('Authorization') === 'Bearer fake-jwt');
        // }






      
        // 2 API Endpoint - User info
        // if (request.url.endsWith('/users') && request.method === 'GET') {
        //   if(request.headers.get('Authorization') === 'kek') {
        //     return of(new HttpResponse({status: 200, body: [this.testUser]}));
        //   } 
        // }
      }
    ))
   }
  }

export let BackendProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: BackendInterceptor,
  multi: true
};
