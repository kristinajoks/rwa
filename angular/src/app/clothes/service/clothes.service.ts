import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { createClothesDTO } from '../../data/dtos/clothes.dto';
import { map, mergeMap, of, switchMap } from 'rxjs';
import { Clothes } from '../../data/models/clothes';

@Injectable({
  providedIn: 'root'
})
export class ClothesService {

  constructor(private httpClient: HttpClient) { }

  createClothes(clothes: createClothesDTO){
    console.log('clothes service angular' + clothes);
    return this.httpClient.post('http://localhost:3000/clothes', clothes);
  }

  addAvatar(clothesId: number, image: File | null){
    const formData = new FormData();
    
    if(image){

      const blobImage = new Blob([image]);
      formData.append('image', blobImage);
    }

    return this.httpClient.post('http://localhost:3000/clothes/avatar', formData);
  }

  createClothesWithAvatar(clothesToCreate: createClothesDTO){
    return this.httpClient.post('http://localhost:3000/clothes', clothesToCreate).pipe(
      mergeMap((clothes) => {
        const clothesObj = clothes as Clothes;

        if(clothesToCreate.image){          
          const formData = new FormData();

          formData.append('clothesId', clothesObj.id.toString());
          
          const blobImage = new Blob([clothesToCreate.image]);
          formData.append('file', blobImage, clothesToCreate.image.name);

          const headers = new HttpHeaders();
          headers.append('Content-Type', 'multipart/form-data');
          
          return this.httpClient.post('http://localhost:3000/clothes/avatar', formData, {headers}).pipe(
            map(() => clothes)
            );
        }
        else{
          return of(clothes);
        }
      })
    );
  }

  getClothes(){
    return this.httpClient.get('http://localhost:3000/clothes');
  }

  getClothesById(id: number){
    return this.httpClient.get(`http://localhost:3000/clothes/${id}`);
  }

}
