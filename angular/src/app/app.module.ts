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
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './store/auth/auth.effects';
import { HomeComponent } from './home/component/home.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { UserEffects } from './store/users/user.effects';
import { AppState } from './store/state/app.state';
import { ShopComponent } from './shop/shop.component';
import { AddClothesModalComponent } from './add-clothes-modal/add-clothes-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ClosetEffects } from './store/closet/closet.effects';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { ShowClothesModalComponent } from './show-clothes-modal/show-clothes-modal.component';
import { DatabaseFileEffects } from './store/databaseFile/databaseFile.effects';
import { SellerDialogComponent } from './seller-dialog/seller-dialog.component';

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
  },
  {
    path: 'shop',
    component: ShopComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    WelcomeComponent,
    HomeComponent,
    AddClothesModalComponent,
    ShowClothesModalComponent,
    SellerDialogComponent
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
      MatDialogModule,
      HttpClientModule,
      StoreModule.forRoot(AppState, {}),
      EffectsModule.forRoot([AuthEffects, UserEffects, ClosetEffects, DatabaseFileEffects]),
      StoreDevtoolsModule.instrument({
        maxAge: 25, 
        logOnly: !isDevMode(), 
        autoPause: true, 
        trace: false, 
        traceLimit: 75, 
        connectOutsideZone: true 
      }),
    ],
    providers: [
      {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true
      }
    ],
    bootstrap: [AppComponent]
  })
  export class AppModule { }
