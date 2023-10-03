import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ClothesOccasion } from '../data/enums/clothesOccasion';
import { ClothesType } from '../data/enums/clothesType';
import { ClothesPlacement } from '../data/enums/clothesPlacement';
import { Store } from '@ngrx/store';
import { selectUser } from '../store/users/user.selector';
import { createClothesDTO } from '../data/dtos/clothes.dto';

@Component({
  selector: 'app-add-clothes-modal',
  templateUrl: './add-clothes-modal.component.html',
  styleUrls: ['./add-clothes-modal.component.css']
})
export class AddClothesModalComponent implements OnInit{
  formData: createClothesDTO = {
    color: "",
    placement: "",
    type: "",
    occasion: "",
    isForSale: false,
    isSold: false,
    isFavorite: false,
    closetId: -1,
    image: null
  };
  returnData: any = {};
  selectedImage: File | null = null;
  selectedImageSrc: string = "";

  user$ = this.store.select(selectUser);
  isSeller = false;
  
  constructor(public dialogRef: MatDialogRef<AddClothesModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private store: Store) { }
   
  ngOnInit(): void {
    this.user$.subscribe(user => {
      if(user && user.role == "Seller")
        this.isSeller = true;
    })
  }
    
  closeModal(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    this.returnData = {
      ...this.formData,
      type: this.data.type,
      image: this.selectedImage
    }

    console.log('ret data' + this.returnData.image);

    this.dialogRef.close(this.returnData);
  }

  onImageSelected(event: any){
    console.log(event.target.files[0]);

    const image = event.target.files[0];
    if(image){
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedImageSrc = e.target.result;
      }
      reader.readAsDataURL(image);
    }

    this.selectedImage = event.target.files[0];
  }


  getPlacementOptions(): string[]{
    return Object.values(ClothesPlacement);
  }

  getOccasionOptions(): string[]{
    return Object.values(ClothesOccasion);
  }
}
