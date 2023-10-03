import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Actions } from '@ngrx/effects';
import 'tslib';
import { loginUser, signupUser } from '../../store/auth/auth.actions';
import { SignupDTO } from '../../data/dtos/signup.dto';
import { AuthState } from '../../store/auth/auth.state';
import { Store } from '@ngrx/store';
import { Role } from '../../data/enums/role';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{
  form: FormGroup = new FormGroup({});
   
  constructor(private formBuilder: FormBuilder,
    private HTTPClient: HttpClient,
    private actions$: Actions,
    private store: Store<AuthState>
    ) {
  }

   ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, 
      Validators.minLength(6), 
      Validators.pattern(this.form.get('password')?.value)]],
      role: [ Role.User, Validators.required]
    }); 
   }

   onSellerCheckboxChange(event: any) {
     if(event.target.checked) {
      this.form.get('role')?.setValue(Role.Seller);
      this.form.get('role')?.updateValueAndValidity();
    } else {
      this.form.get('role')?.setValue(Role.User);
      this.form.get('role')?.updateValueAndValidity();
    }
  }
  
   onSubmit(): void {
     if(this.form.valid) {
      this.store.dispatch(signupUser( {user: this.form.getRawValue()} ));
   }

}}