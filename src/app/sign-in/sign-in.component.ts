import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {

  constructor(private auth: AuthService, private router: Router) {}

  login() {
    let creds = {
      username: 'test',
      password: 'test',
    };

    this.auth.login(creds.username, creds.password).pipe(first())
    .subscribe(
      data => this.router.navigate(['/home']),
    );
    console.log('>>> login ', creds);
  }
}
