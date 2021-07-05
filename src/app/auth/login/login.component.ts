import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import {
  SocialAuthService,
  GoogleLoginProvider,
  SocialUser,
  FacebookLoginProvider,
} from 'angularx-social-login';
import { AuthenticationService } from 'src/app/services/authentication.service';
@Component({
  selector: 'air-system-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm!: FormGroup;
  isButtonDisabled: boolean = false;
  isGoogleButtonDisabled: boolean = false;
  isFbButtonDisabled: boolean = false;
  isSubmitted!: boolean;
  loggedIn!: boolean;
  private _emailRegex =
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _socialAuthService: SocialAuthService,
    private _authenticationService: AuthenticationService
  ) {}

  ngOnInit() {
    this._buildForm();
  }

  private _buildForm(): void {
    this.loginForm = this._fb.group({
      email: ['', [Validators.required, Validators.pattern(this._emailRegex)]],
      password: ['', [Validators.required]],
    });
  }

  get email(): AbstractControl {
    return this.loginForm.controls.email;
  }

  get password(): AbstractControl {
    return this.loginForm.controls.password;
  }

  get f() {
    return this.loginForm.controls;
  }

  doLogin(): void {}

  private _applyValidations(): void {
    for (const i in this.loginForm.controls) {
      if (this.loginForm.controls.hasOwnProperty(i)) {
        this.loginForm.controls[i].markAsDirty();
        this.loginForm.controls[i].updateValueAndValidity();
      }
    }
  }

  submitForm(): void {
    this.isSubmitted = true;
    this._applyValidations();
    if (this.loginForm.invalid) {
      return;
    }
    this.isButtonDisabled = true;
  }

  signInWithGoogle(): void {
    this._doSignInWithGoogle();
  }

  signInWitFacebook(): void {
    this._doSignInWithFacebook();
  }

  private _doSignInWithGoogle(): void {
    this.isGoogleButtonDisabled = true;
    this._socialAuthService
      .signIn(GoogleLoginProvider.PROVIDER_ID)
      .then((user: SocialUser) => {
        this._authenticationService.setCurrentUserInfo(user);
        this._executePostLogin();
      })
      .catch((error) => {
        this.isGoogleButtonDisabled = false;
      });
  }

  private _doSignInWithFacebook(): void {
    this.isFbButtonDisabled = true;
    this._socialAuthService
      .signIn(FacebookLoginProvider.PROVIDER_ID)
      .then((user: SocialUser) => {
        this._authenticationService.setCurrentUserInfo(user);
        this._executePostLogin();
      })
      .catch((error) => {
        this.isFbButtonDisabled = false;
      });
  }
  _executePostLogin(): void {
    this._router.navigate(['/editor']);
  }
}
