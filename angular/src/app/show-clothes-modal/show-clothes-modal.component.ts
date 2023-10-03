import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { ImageService } from '../image.service';
import { Clothes } from '../data/models/clothes';
import { loadDatabaseFile } from '../store/databaseFile/databaseFile.actions';
import { selectRole } from '../store/users/user.selector';
import { Role } from '../data/enums/role';

@Component({
  selector: 'app-show-clothes-modal',
  templateUrl: './show-clothes-modal.component.html',
  styleUrls: ['./show-clothes-modal.component.css']
})
export class ShowClothesModalComponent implements OnInit {
    isSeller = false;

    constructor(public dialogRef: MatDialogRef<ShowClothesModalComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private store: Store) { }

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

      // this.data.clothes.forEach(
        // (element: { src: string; }) => {
        // console.log(element.src);

        // this.imageService.getImage(element.src).subscribe((image) => {
        //   console.log(image);
  
        //   //morace ipak neke akcije dase naprave zbog asinhronog ucitavanja slike
  
        //   const reader = new FileReader();
        //   reader.onload = () =>{
        //     this.displayImage = reader.result;
        //   };
        //   reader.readAsDataURL(image);
        // })

      // }

      //pre svega mora imati da je odeca kada se doda automatski povezana sa ormanom
      //a onda ukoliko jeste, izvlaciti je iz njega
      //najprakticnije bi bilo uzeti svu odecu iz ormara gde je tip odgovarajuc.

      // );

      this.store.select(selectRole).subscribe((role) => {
        if(role == Role.Seller){
          this.isSeller = true;
        }
      });

    }

    closeModal(): void {
      this.dialogRef.close();
    }


}
