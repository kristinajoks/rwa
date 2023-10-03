import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatabaseFileService {

  constructor(private httpClient: HttpClient) { }

  getDatabaseFileById(id: number) {
    return this.httpClient.get('http://localhost:3000/database-files/' + id, {
      responseType: 'blob'
    });
  }
}
