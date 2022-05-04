import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CreateUsertDTO, User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private apiURL ="/api/users/";

  constructor(
    private http: HttpClient
  ) { }

  create(dto: CreateUsertDTO){
    return this.http.post<User>(this.apiURL, dto);
  }

  getAll(){
    return this.http.get<User[]>(this.apiURL);
  }
}
