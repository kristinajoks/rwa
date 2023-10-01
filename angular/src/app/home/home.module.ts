import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './component/home.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDialogModule } from '@angular/material/dialog';



@NgModule({
  declarations: [
  ],
  exports:[MatSidenavModule, MatDialogModule],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatDialogModule
  ]
})
export class HomeModule { }
