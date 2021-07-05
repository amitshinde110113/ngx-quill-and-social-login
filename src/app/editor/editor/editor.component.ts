import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { SocialUser } from 'angularx-social-login';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
})
export class EditorComponent implements OnInit {
  quill!: String;
  user!: SocialUser;
  constructor(
    private _trustHrml: DomSanitizer,
    private _authenticationService: AuthenticationService
  ) {
    this.user = this._authenticationService.getCurrentUserInfo();
  }

  ngOnInit(): void {}

  trustHTML(html: any) {
    return this._trustHrml.bypassSecurityTrustHtml(html);
  }
  logout(): void {
    this._authenticationService.logout();
  }
}
