import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private httpClient: HttpClient) { }

  //ovo diskutabilno izmenice se
  getImage(imageUrl: string): Observable<Blob>{
    console.log(imageUrl);
    return this.httpClient.get('http://localhost:3000/image/'+imageUrl, { responseType: 'blob' });
  }

  imageSubject = new Subject<File>();

  setImage(image: File){
    this.imageSubject.next(image);
  }

  getImageStream(): Observable<File>{
    return this.imageSubject.asObservable();
  }

}
