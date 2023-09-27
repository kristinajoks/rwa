import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  
  constructor(private formBuilder: FormBuilder) {
  }

   ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', Validators.required, Validators.email],
      password: ['', Validators.required, Validators.minLength(6)],
    }); 
   }

   onSubmit(): void {
    if(this.form.valid) {
      // this.store.dispatch(new Signup(this.form.value));
    }
   }
}
