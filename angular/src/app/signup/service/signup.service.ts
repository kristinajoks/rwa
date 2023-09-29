import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SignupDTO } from '../../data/dtos/signup.dto';
import { Jwt } from '../../data/models/jwt';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private httpClient: HttpClient) { }

  signup(user: SignupDTO){
    return this.httpClient.post<Jwt>('http://localhost:3000/auth/signup', user);
  }

}
