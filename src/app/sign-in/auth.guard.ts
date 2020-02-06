import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";

import { Observable } from "rxjs";

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}
 
  canActivate(
    // route: ActivatedRouteSnapshot,
    // state: RouterStateSnapshot,
  ): Observable<boolean> | boolean {
      if (localStorage.getItem('currentUser')) return true;
      // consoles.log(route);

      // this.router.navigate(['/sign-in'], { queryParams: { returnUrl: state.url }});
      // this.router.navigate(['/sign-in']);
      return false;
  }
}