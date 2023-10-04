import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { ImageService } from '../image.service';
import { Clothes } from '../data/models/clothes';
import { cleanDatabaseFiles, loadDatabaseFile } from '../store/databaseFile/databaseFile.actions';
import { selectRole } from '../store/users/user.selector';
import { Role } from '../data/enums/role';
import { DatabaseFile } from '../data/models/databaseFile';
import { selectDatabaseFileLoadedDatabaseFiles } from '../store/databaseFile/databaseFile.selector';
import { DomSanitizer } from '@angular/platform-browser';
import { addOutfitToCloset, updateClothesForSale } from '../store/closet/closet.actions';
import { addClothesToOutfit, getOutfits } from '../store/outfits/outfits.actions';

@Component({
  selector: 'app-show-clothes-modal',
  templateUrl: './show-clothes-modal.component.html',
  styleUrls: ['./show-clothes-modal.component.css']
})
export class ShowClothesModalComponent implements OnInit {
  isSeller = false;
  loadedDatabaseFiles$ = this.store.select(selectDatabaseFileLoadedDatabaseFiles);
  isThereClothes = false;

  constructor(public dialogRef: MatDialogRef<ShowClothesModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private store: Store,
    private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.data.clothes.forEach(
      (element : Clothes) => { 
        if(element.type == this.data.type){ 

          if(element.avatarId != null){
            this.store.dispatch(loadDatabaseFile({id: element.avatarId}));
          }
        }
      }
    );

    this.store.select(selectRole).subscribe((role) => {
      if(role == Role.Seller){
        this.isSeller = true;
      }
    });

    this.loadedDatabaseFiles$.subscribe((databaseFiles) => {
      if(databaseFiles.length > 0){
        this.isThereClothes = true;
      }
    });      
    
  }

  currentIndex = 0;
  prevItem(){
    this.currentIndex = Math.max(this.currentIndex - 1, 0);
  }

  nextItem(){
    this.currentIndex = Math.min(this.currentIndex + 1, this.data.clothes.length - 1);
  }

  closeModal(): void {
    this.dialogRef.close();
    console.log("modal closed");
    this.store.dispatch(cleanDatabaseFiles());
  }

  isClothesAvatarForSale(avatarId: number): boolean{
    const clothes = this.matchClothesWithAvatar(avatarId);
    return this.isClothesForSale(clothes);
  }

  matchClothesWithAvatar(avatarId: number) : Clothes | null{
    let toReturn = null;

    this.data.clothes.forEach(
      (element : Clothes) => { 
        if(element.avatarId == avatarId){
          toReturn = element;
        }
      }
    );
      return toReturn;
  }

  isClothesForSale(clothes: Clothes | null) : boolean{
    if(clothes != null){
      return clothes.isForSale;
    }
    return false;
  }

  changeClothesForSale(avatarId: number){
    const clothes = this.matchClothesWithAvatar(avatarId);
    if(clothes != null){

      this.store.dispatch(updateClothesForSale({clothes: clothes as Clothes}));
    }
  }

  addClothesToOutfitFun(avatarId: number){ 
    const clothes = this.matchClothesWithAvatar(avatarId);
    if(clothes != null){
      this.store.dispatch(addClothesToOutfit({clothesId: clothes.id}))
    }
  }

}