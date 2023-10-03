import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { SellerDialogService } from './seller-dialog.service';
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
    private sellerDialogService: SellerDialogService,
    private store: Store) {}


  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    // if (this.becomeSeller) {

      // this.sellerDialogService.updateUserRoleFromModal(this.data.userId, Role.Seller);
      this.store.dispatch(changeUserRole({userId: this.data.userId, role: Role.Seller}));

      this.dialogRef.close();

      // Make an API call to update the user's role to 'Seller'
      // After a successful update, close the dialog
      // Example API call:
      // userService.updateUserRoleToSeller().subscribe(() => {
      //   this.dialogRef.close();
      // });
    // } else {
    //   // Handle the case where the checkbox is not checked
    // }
  }
}
