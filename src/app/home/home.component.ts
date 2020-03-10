import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(private auth: AuthService, private router: Router) {}

  onClick() {
    this.auth.logout();
    this.router.navigate(['/sign-in']);
  }
}
