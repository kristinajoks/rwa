import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { logoutUser } from '../../store/auth/auth.actions';
import { loadUser } from '../../store/users/user.actions';
import { selectUserId } from '../../store/auth/auth.selector';
import { Observable, take } from 'rxjs';
import { User } from '../../data/models/user';
import { selectClosetId, selectEmail, selectRole, selectUser } from '../../store/users/user.selector';
import { ClothesType } from '../../data/enums/clothesType';
import { MatDialog } from '@angular/material/dialog';
import { AddClothesModalComponent } from '../../add-clothes-modal/add-clothes-modal.component';
import { createClothesDTO } from '../../data/dtos/clothes.dto';
import { addClothesToCloset, loadClothesFromCloset } from '../../store/closet/closet.actions';
import { ShowClothesModalComponent } from '../../show-clothes-modal/show-clothes-modal.component';
import { selectClothes } from '../../store/closet/closet.selector';
import { Clothes } from '../../data/models/clothes';
import { ImageService } from '../../image.service';
import { Role } from '../../data/enums/role';
import { SellerDialogService } from '../../seller-dialog/seller-dialog.service';
import { SellerDialogComponent } from '../../seller-dialog/seller-dialog.component';
import { cleanDatabaseFiles } from '../../store/databaseFile/databaseFile.actions';

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

  closetId: number = -1;
  clothes : Clothes[] = [];

  isUser$ = this.store.select(selectRole);

  constructor(private store: Store,
    private dialog: MatDialog,
    private imageService: ImageService,
    private sellerDialogService: SellerDialogService
    ) { }
  
  ngOnInit(): void {
  
    this.store.select(selectUserId).pipe(
      take(1)
    ).subscribe((userId) =>{
      this.userId = userId;
      this.store.dispatch(loadUser( {userId: this.userId}));
    })

    this.store.select(selectClosetId).subscribe((closetId) =>{
      this.closetId = closetId;
    })  

    this.store.select(selectClothes).subscribe((clothes) =>{
      this.clothes = clothes;
    })
  }
  

  moveClosetDoor() {
    this.isDoorOpen = !this.isDoorOpen;
  }

  logout(){
    this.store.dispatch(logoutUser())
    this.store.dispatch(cleanDatabaseFiles());
  }  

openAddClothesDialog(type: string){
  const addDialogRef = this.dialog.open(AddClothesModalComponent, { 
    width: '300px',
    data: {type: type}
    });

    addDialogRef.afterClosed().subscribe(result => {
      this.createClothesFromForm(result);      
    });
  }

  createClothesFromForm(result: any){
    if(!result)
      return;
    
    const newClothes : createClothesDTO = {
      color: result.color,
      placement: result.placement,
      type: result.type,
      occasion: result.occasion,
      isForSale: result.isForSale,
      isSold: false,
      isFavorite: false,
      closetId: this.closetId,
      image: result.image
    }
    
    if(newClothes.image){
      this.imageService.setImage(newClothes.image);
    }

    this.store.dispatch(addClothesToCloset({clothes: newClothes}));
  }

  openShowClothesDialog(type: string){
    const clothesToShow = this.clothes.filter(clothes => clothes.type == type);
    

    const addDialogRef = this.dialog.open(ShowClothesModalComponent, {
      width: '300px',
      data: {clothes: clothesToShow, type: type}
    });
  }

  openSellerDialog(): void {
  //da my posaljem id

    const addDialogRef = this.dialog.open(SellerDialogComponent, {
      width: '400px',
      data: {userId : this.userId}
    });
  }

}
