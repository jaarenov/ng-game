import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { BackendProvider } from './api/fake-backend';
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth/auth.guard';
import { NewGameComponent } from './new-game/new-game.component';
import { AuthorComponent } from './author/author.component';
import { SettingsComponent } from './settings/settings.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NewGameComponent,
    AuthorComponent,
    SettingsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    AuthModule,
  ],
  exports: [
    ReactiveFormsModule,
  ],
  providers: [
    AuthGuard,
    BackendProvider,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
