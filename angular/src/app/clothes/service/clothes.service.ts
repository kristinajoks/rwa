import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { createClothesDTO } from '../../data/dtos/clothes.dto';

@Injectable({
  providedIn: 'root'
})
export class ClothesService {

  constructor(private httpClient: HttpClient) { }

  createClothes(clothes: createClothesDTO){
    console.log('clothes service angular' + clothes);
    return this.httpClient.post('http://localhost:3000/clothes', clothes);
  }

  getClothes(){
    return this.httpClient.get('http://localhost:3000/clothes');
  }

  getClothesById(id: number){
    return this.httpClient.get(`http://localhost:3000/clothes/${id}`);
  }

}
