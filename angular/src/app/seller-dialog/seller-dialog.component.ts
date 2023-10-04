import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Role } from '../data/enums/role';
import { changeUserRole } from '../store/users/user.actions';

@Component({
  selector: 'app-seller-dialog',
  templateUrl: './seller-dialog.component.html',
  styleUrls: ['./seller-dialog.component.css']
})
export class SellerDialogComponent {
  becomeSeller = false;

  constructor(private dialogRef: MatDialogRef<SellerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private store: Store) {}


  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    this.store.dispatch(changeUserRole({userId: this.data.userId, role: Role.Seller}));

    this.dialogRef.close();
  }
}
