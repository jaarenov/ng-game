import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup, AbstractControl } from '@angular/forms';

import { AuthService } from '../services/auth.service';
import { first, tap } from 'rxjs/operators';

@Component({
  selector: 'sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  form: FormGroup;

  constructor(
    private auth: AuthService,
    private router: Router,
    private fb: FormBuilder,
  ) {}

  ngOnInit() {
    this.auth.logout();
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  get controls() {
    return this.form.controls;
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    this.auth.login(
      this.controls.email.value,
      this.controls.password.value,
    )
    .pipe(
      first(),
    )
    .subscribe(
      () => this.router.navigate(['/home']),
    );
  }
}
