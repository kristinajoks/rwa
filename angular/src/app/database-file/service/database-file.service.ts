import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatabaseFileService {

  constructor(private httpClient: HttpClient) { }

  getDatabaseFileById(id: number) {
    return this.httpClient.get('http://localhost:3000/database-files/' + id);
  }

  // getDatabaseFileById(id: number) {
  //   return this.httpClient.get('http://localhost:3000/database-files/' + id, {
  //     responseType: 'blob'
  //   });
  // }
  //u sustini vraca samo blob jer je tako namesteno u backendu

  // getDatabaseFileById(id: number) {
  //   return this.httpClient.get('http://localhost:3000/database-files/' + id, {
  //     responseType: 'arraybuffer'
  //   }).pipe(
  //     map((response: ArrayBuffer) => {
  //       return new Uint8Array(response);
  //       }        
  //     ));
  // }

}
