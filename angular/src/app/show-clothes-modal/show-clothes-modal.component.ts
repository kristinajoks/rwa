import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { ImageService } from '../image.service';
import { Clothes } from '../data/models/clothes';
import { loadDatabaseFile } from '../store/databaseFile/databaseFile.actions';
import { selectRole } from '../store/users/user.selector';
import { Role } from '../data/enums/role';
import { DatabaseFile } from '../data/models/databaseFile';
import { selectDatabaseFileLoadedDatabaseFiles } from '../store/databaseFile/databaseFile.selector';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-show-clothes-modal',
  templateUrl: './show-clothes-modal.component.html',
  styleUrls: ['./show-clothes-modal.component.css']
})
export class ShowClothesModalComponent implements OnInit {
    isSeller = false;
    loadedDatabaseFiles$ = this.store.select(selectDatabaseFileLoadedDatabaseFiles);

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

      // this.store.select(selectDatabaseFileLoadedDatabaseFiles).subscribe((databaseFiles) => {
      //   this.loadedDatabaseFiles = databaseFiles;
      //   this.isLoading = false;

      // });
      
      
    }

    closeModal(): void {
      this.dialogRef.close();
    }

    displayImage(data: Uint8Array){
      const blob = new Blob([data], { type: 'image/png' });
      const url = URL.createObjectURL(blob);
    }

    // displayImage(dbFile : DatabaseFile){
    //   const blob = new Blob([dbFile.data], { type: 'image/png' });
    //   const url = window.URL.createObjectURL(blob);
    //   // return url;
    //   return this.sanitizer.bypassSecurityTrustUrl(url);
    // }

}
