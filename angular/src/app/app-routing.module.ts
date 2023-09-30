import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { LoginComponent } from './login/component/login.component';
import { SignupComponent } from './signup/component/signup.component';
import { HomeComponent } from './home/component/home.component';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  {path: '', component: WelcomeComponent },
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'home', 
  component: HomeComponent,
  canActivate: [authGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }