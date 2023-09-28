import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  //experimenting
  @Input()
  form = {
    username: '',
    password: '',
    setValue : (value: any) => {
      this.form.username = value.username;
      this.form.password = value.password;
    }
  };

  @Output()
  submit = new EventEmitter();

  constructor() { }

  onSubmit(): void {
    this.submit.emit(this.form);
  }
  //

}
