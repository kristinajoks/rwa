import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OutfitDTO } from '../data/dtos/outfit.dto';

@Injectable({
  providedIn: 'root'
})
export class OutfitService {

  constructor(private httpClient: HttpClient) { }

  createOutfit(outfit: OutfitDTO){
    const ids = outfit.clothes.map(clothes => clothes.clothesId);
    if(!ids || ids.length == 0 || ids.length == 1 || ids.length > 3){
      throw new Error('Outfit must have between 2 and 3 clothing items');
    }
    return this.httpClient.post(`http://localhost:3000/outfit/${outfit.closetId}`, ids);
  }

  getOutfits(){
    return this.httpClient.get('http://localhost:3000/outfit');
  }
}
