import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './component/home.component';
import { MatSidenavModule } from '@angular/material/sidenav';



@NgModule({
  declarations: [
  ],
  exports:[MatSidenavModule],
  imports: [
    CommonModule,
    MatSidenavModule
  ]
})
export class HomeModule { }
