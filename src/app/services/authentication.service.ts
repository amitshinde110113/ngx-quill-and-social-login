import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SocialUser } from 'angularx-social-login';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private _user!: SocialUser;
  constructor(private router: Router) {
    this._user = this._getCurrentUserInfoFromoLocal();
  }

  setCurrentUserInfo(user: SocialUser): void {
    this._user = user;
    this._setCurrentUserInfoToLocal(user);
  }

  getCurrentUserInfo(): SocialUser {
    return this._user;
  }

  private _setCurrentUserInfoToLocal(user: SocialUser): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  private _getCurrentUserInfoFromoLocal(): SocialUser {
    let user = localStorage.getItem('user');
    let parsed!: SocialUser;
    if (user) {
      parsed = JSON.parse(user);
    }
    return parsed;
  }
  _removeCurrentUser(): void {
    localStorage.clear();
    this._user = new SocialUser();
    this.router.navigate(['/auth']);
  }
  logout(): void {
    this._removeCurrentUser();
  }
}
