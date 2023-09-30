import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Actions } from '@ngrx/effects';
import { AuthState } from '../../store/auth/auth.state';
import { loginUser } from '../../store/auth/auth.actions';
import { LoginDTO } from '../../data/dtos/login.dto';
import { selectUserId } from '../../store/auth/auth.selector';
import { loadUser } from '../../store/users/user.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  form: FormGroup = new FormGroup({});

  constructor(private formBuilder: FormBuilder,
    private HTTPClient: HttpClient,
    private actions$: Actions,
    private store: Store<AuthState>
    ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    
  }

  onSubmit(): void {
    if(this.form.valid) {
      this.store.dispatch(loginUser( {user: this.form.getRawValue()} ));
    }
  }

}