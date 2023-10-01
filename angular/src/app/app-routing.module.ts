import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { LoginComponent } from './login/component/login.component';
import { SignupComponent } from './signup/component/signup.component';
import { HomeComponent } from './home/component/home.component';
import { authGuard, unAuthGuard } from './guards/auth.guard';
import { ShopComponent } from './shop/shop.component';

const routes: Routes = [
  {path: '', 
  component: WelcomeComponent },
  {path: 'login', 
  component: LoginComponent,
  canActivate: [unAuthGuard]},
  {path: 'signup', 
  component: SignupComponent,
  canActivate: [unAuthGuard]},
  {path: 'home', 
  component: HomeComponent,
  canActivate: [authGuard]},
  {path: 'shop',
  component: ShopComponent,
  canActivate: [authGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }