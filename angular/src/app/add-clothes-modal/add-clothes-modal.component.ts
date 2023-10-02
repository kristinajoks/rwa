import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ClothesOccasion } from '../data/enums/clothesOccasion';
import { ClothesType } from '../data/enums/clothesType';
import { ClothesPlacement } from '../data/enums/clothesPlacement';
import { Store } from '@ngrx/store';
import { selectUser } from '../store/users/user.selector';

@Component({
  selector: 'app-add-clothes-modal',
  templateUrl: './add-clothes-modal.component.html',
  styleUrls: ['./add-clothes-modal.component.css']
})
export class AddClothesModalComponent implements OnInit{
  formData: any = {
    color: "",
    placement: "",
    type: "",
    occasion: "",
    src: "",
    isForSale: false,
  };
  returnData: any = {};
  selectedImage: any;

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
      // src: this.selectedImage? this.selectedImage : ""
      src:'src/shared/assets/clothes/' + this.data.type 
      + '/' + this.formData.color + '.png'
    }
    this.dialogRef.close(this.returnData);
  }

  onImageSelected(event: any){
    const image = event.target.files[0];
    if(image){
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedImage = e.target.result;
      }
      reader.readAsDataURL(image);
    }
  }


  getPlacementOptions(): string[]{
    return Object.values(ClothesPlacement);
  }

  getOccasionOptions(): string[]{
    return Object.values(ClothesOccasion);
  }
}
