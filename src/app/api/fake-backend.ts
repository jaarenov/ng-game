import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

@Injectable()
export class BackendInterceptor implements HttpInterceptor {
  testUser = {
    id: 1,
    username: 'test',
    password: 'test',
    firstName: 'John',
    lastName: 'Doe',
  };

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return of(null).pipe(
      mergeMap(() => {
        // 1 API Endpoint - Auth
        if (request.url.endsWith('/auth') && request.method === 'POST') {
          console.log('>>> /auth', request.body);

          let body = {
            username: this.testUser.username,
            firstName: this.testUser.firstName,
            lastName: this.testUser.lastName,
            token: 'kek',
          }

          return of(new HttpResponse({ status: 200, body }));
        }

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
