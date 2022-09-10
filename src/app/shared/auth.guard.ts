import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { getTokenExpiration } from './token.utils';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (!sessionStorage.getItem('token')) {
      console.log('no token');
      this.router.navigate(['/']);
      return false;
    } else {
      //check if token is not expired
      const tokenValue: any = getTokenExpiration();
      let expired: boolean = true;
      expired = new Date(tokenValue * 1000) < new Date();
      if (expired) {
        sessionStorage.removeItem('token');
        this.router.navigate(['/']);
        return false;
      }
      return true;
    }
  }
}
