import { Routes } from '@angular/router';

import { SignInComponent } from './sign-in/sign-in.component';
import { HomeComponent } from './home/home.component';

import { AuthGuard } from './sign-in/auth.guard';

export const routes: Routes = [
  { path: '', 
    redirectTo: 'sign-in',
    pathMatch: 'full',
  },
  {
    path: 'sign-in',
    component: SignInComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
];
