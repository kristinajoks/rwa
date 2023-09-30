import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthState } from '../../store/auth/auth.state';
import { Actions } from '@ngrx/effects';
import { logoutUser } from '../../store/auth/auth.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  isDoorOpen = false;

  constructor(private store: Store<AuthState>) { }

  openDoor() {
    this.isDoorOpen = !this.isDoorOpen;
  }

  logout(){
    this.store.dispatch(logoutUser())
  }  

}
