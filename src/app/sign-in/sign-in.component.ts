import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { AuthService } from '../services/auth.service';
import { first } from 'rxjs/operators';

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
    console.log('>>>', this.form.controls['email'].value);
    this.createForm();

    this.auth.logout();
  }

  createForm() {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    this.auth.login(
      this.form.controls.email.value,
      this.form.controls.password.value,
    )
    .pipe(first())
    .subscribe(
      data => this.router.navigate(['/home']),
    );
  }
}
