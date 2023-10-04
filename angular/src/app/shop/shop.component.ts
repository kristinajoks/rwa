import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectClosetId, selectUser, selectUserId } from '../store/users/user.selector';
import { tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { loadCloset } from '../store/closet/closet.actions';
import { selectClothes } from '../store/closet/closet.selector';
import { selectDatabaseFileLoadedDatabaseFiles } from '../store/databaseFile/databaseFile.selector';
import { loadDatabaseFile } from '../store/databaseFile/databaseFile.actions';
import { Clothes } from '../data/models/clothes';
import { getClothesInTheStore } from '../store/clothesInStore/clothesInStore.actions';
import { selectClothesInStore } from '../store/clothesInStore/clothesInStore.selector';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit{

  //prati korisnika. ukoliko je korisnik prodavac, prikazuje se lista njegovih stvari koje su na prodaju
  //ukoliko nije, preuzimaju se svi korisnici koji jesu prodavci, i za svakog se prikazuje lista njegovih stvari koje su na prodaju

  currentUser$ = this.store.select(selectUser);

  currentUserClothes$ = this.store.select(selectClothesInStore);

  constructor(private store: Store,
    ) { }

  ngOnInit(): void {
  }

}
