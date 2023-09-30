import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {RouterModule, Routes} from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/component/login.component';
import { SignupComponent } from './signup/component/signup.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { WelcomeComponent } from './welcome/welcome.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { StoreModule } from '@ngrx/store';
import { HttpClientModule } from '@angular/common/http';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './store/auth/auth.effects';
import { HomeComponent } from './home/component/home.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { UserEffects } from './store/users/user.effects';
import { AppState } from './store/state/app.state';

const appRoutes: Routes = [
  { 
    path: '', 
    component: WelcomeComponent 
  },
  { 
    path: 'login', 
    component: LoginComponent 
  },
  { 
    path: 'signup', 
    component: SignupComponent
  },
  {
    path: 'home',
    component: HomeComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    WelcomeComponent,
    HomeComponent
  ],

    imports: [
      BrowserModule,
      FontAwesomeModule,
      RouterModule.forRoot(appRoutes),
      NoopAnimationsModule,
      AppRoutingModule,
      FormsModule,
      ReactiveFormsModule,
      MatSidenavModule,
      HttpClientModule,
      StoreModule.forRoot(AppState, {}),
      EffectsModule.forRoot([AuthEffects, UserEffects]),
      StoreDevtoolsModule.instrument({
        maxAge: 25, 
        logOnly: !isDevMode(), 
        autoPause: true, 
        trace: false, 
        traceLimit: 75, 
        connectOutsideZone: true 
      }),
    ],
    providers: [],
    bootstrap: [AppComponent]
  })
  export class AppModule { }
