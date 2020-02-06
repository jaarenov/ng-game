import { Component } from '@angular/core';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {

  constructor(private auth: AuthService) {}

  login() {
    let creds = {
      username: 'test',
      password: 'test',
    };

    this.auth.login(creds.username, creds.password);
    console.log('>>> login ', creds);
  }
}
