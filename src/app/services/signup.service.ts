import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private http:HttpClient) { }

  //add user
  public addUser(user:any){
    return this.http.post(`http://localhost:8083/api/nutrition/userdetails/saveUser`,user);//url&data
  }
}
