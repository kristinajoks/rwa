import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { logoutUser } from '../../store/auth/auth.actions';
import { loadUser } from '../../store/users/user.actions';
import { selectUserId } from '../../store/auth/auth.selector';
import { Observable, take } from 'rxjs';
import { User } from '../../data/models/user';
import { selectEmail, selectUser } from '../../store/users/user.selector';
import { ClothesType } from '../../data/enums/clothesType';
import { MatDialog } from '@angular/material/dialog';
import { AddClothesModalComponent } from '../../add-clothes-modal/add-clothes-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  isDoorOpen = false;
  userId: number = -1;
  user$ = this.store.select(selectUser);

  clothesTypes = Object.values(ClothesType);
  clothesTypesNum = this.clothesTypes.length;
  clothesTypesHeight = 100 / this.clothesTypesNum;
  clothesTypesHeightPercentage = this.clothesTypesHeight + "%";

  constructor(private store: Store,
    private dialog: MatDialog
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

  openAddClothesDialog(type: string){
    const addDialogRef = this.dialog.open(AddClothesModalComponent, { 
      width: '250px',
      data: {type: type}
      });

    addDialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
  }

  
}
