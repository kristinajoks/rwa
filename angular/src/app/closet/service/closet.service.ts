import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClosetService {

  constructor(private httpClient: HttpClient) { }

  getClosets(){
    return this.httpClient.get('http://localhost:3000/closet');
  }

  getClosetById(id: number){
    return this.httpClient.get(`http://localhost:3000/closet/findbyid?id=${id}`);
  }

  getClothesFromCloset(id: number){
    return this.httpClient.get(`http://localhost:3000/closet/getclothes?id=${id}`);
  }
}
