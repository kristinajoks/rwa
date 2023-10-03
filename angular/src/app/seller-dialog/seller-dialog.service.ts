// seller-dialog.service.ts

import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../user/service/user.service';
import { Role } from '../data/enums/role';

@Injectable({
  providedIn: 'root',
})
export class SellerDialogService {
  constructor(private dialog: MatDialog,
    private userService: UserService) {}

  async updateUserRoleFromModal(userId: number, role: Role){
    await this.userService.changeUserRole(userId, role);
  }
  
}
