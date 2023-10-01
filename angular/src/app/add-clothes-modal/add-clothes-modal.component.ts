import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-clothes-modal',
  templateUrl: './add-clothes-modal.component.html',
  styleUrls: ['./add-clothes-modal.component.css']
})
export class AddClothesModalComponent {
  constructor(public dialogRef: MatDialogRef<AddClothesModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

    closeModal(): void {
      this.dialogRef.close();
    }
}
