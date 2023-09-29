import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Jwt } from '../../data/models/jwt';
import { LoginDTO } from '../../data/dtos/login.dto';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient) { }

  login(user: LoginDTO) {
    return this.httpClient.post<Jwt>('http://localhost:3000/auth/login', user);
  }

  logout() { //diskutabilno, revise
    localStorage.removeItem('token');
  }

  isLoggedIn() {
    return localStorage.getItem('token') !== null;
  }
}
