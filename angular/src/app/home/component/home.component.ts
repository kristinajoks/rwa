import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { logoutUser } from '../../store/auth/auth.actions';
import { loadUser } from '../../store/users/user.actions';
import { selectUserId } from '../../store/auth/auth.selector';
import { Observable, take } from 'rxjs';
import { User } from '../../data/models/user';
import { selectEmail, selectUser } from '../../store/users/user.selector';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  isDoorOpen = false;
  userId: number = -1;
  user$ = this.store.select(selectUser);

  constructor(private store: Store
    ) { }
  
  ngOnInit(): void {
    this.store.select(selectUserId).pipe(
      take(1)
    ).subscribe((userId) =>{
      this.userId = userId;
      this.store.dispatch(loadUser( {userId: this.userId}));
    })
  }



  moveClosetDoor() {
    this.isDoorOpen = !this.isDoorOpen;
  }

  logout(){
    this.store.dispatch(logoutUser())
  }  
  
}
