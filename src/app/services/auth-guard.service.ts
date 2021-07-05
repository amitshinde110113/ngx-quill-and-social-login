import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private _router: Router,
    private _authenticationService: AuthenticationService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const user = this._authenticationService.getCurrentUserInfo();
    if (user && user.authToken) {
      // authorised so return true
      return true;
    }
    // not logged in so redirected to login page with return url
    this._router.navigate(['/auth/login']);
    return false;
  }
}
