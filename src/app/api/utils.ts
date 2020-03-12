import { HttpResponse } from '@angular/common/http';
import { of, throwError } from 'rxjs';

export function ok(body?) {
  return of(new HttpResponse({ status: 200, body }));
}

export function error(message) {
  return throwError({ message }); 
}
