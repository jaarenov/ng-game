import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './sign-in/auth.guard';
import { BackendProvider } from './fake-backend';
import { tokenInterceptor } from './interceptors/token.intercerptor';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    AuthGuard,
    BackendProvider,
    { provide: HTTP_INTERCEPTORS, useClass: tokenInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
