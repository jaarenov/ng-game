import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
 
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}
 
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) : Observable<boolean> | boolean {
      if (localStorage.getItem('currentUser')) return true;

      this.router.navigate(['/home']);
      return false;
  }
}