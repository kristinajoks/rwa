import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  getUserById(id: number) {
    return this.httpClient.get('http://localhost:3000/user/findbyid?id=' + id);
  }

  addClosetToUser(userId: number){
    return this.httpClient.post('http://localhost:3000/closet/create', {ownerId: userId});
  }
}
