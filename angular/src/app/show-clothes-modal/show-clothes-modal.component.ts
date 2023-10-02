import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { ImageService } from '../image.service';

@Component({
  selector: 'app-show-clothes-modal',
  templateUrl: './show-clothes-modal.component.html',
  styleUrls: ['./show-clothes-modal.component.css']
})
export class ShowClothesModalComponent implements OnInit {
    displayImage : any;

    constructor(public dialogRef: MatDialogRef<ShowClothesModalComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private store: Store,
      private imageService: ImageService) { }

    ngOnInit(): void {
      console.log(this.data);
      console.log(this.data.src);

      this.imageService.getImage(this.data.src).subscribe((image) => {
        console.log(image);

        //morace ipak neke akcije dase naprave zbog asinhronog ucitavanja slike

        const reader = new FileReader();
        reader.onload = () =>{
          this.displayImage = reader.result;
        };
        reader.readAsDataURL(image);
      })
    }

    closeModal(): void {
      this.dialogRef.close();
    }


}
