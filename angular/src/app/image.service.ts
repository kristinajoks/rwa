import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private httpClient: HttpClient) { }

  getImage(imageUrl: string): Observable<Blob>{
    console.log(imageUrl);
    return this.httpClient.get('http://localhost:3000/image/'+imageUrl, { responseType: 'blob' });
  }
}
