import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }

  //current user which is loggedin
  public getCurrentUser(){
    return this.http.get(`http://localhost:9000/user/current-user`);//only url
  }

  //getting token
  public generateToken(loginData:any){
    return this.http.post(`http://localhost:8081/auth/login`,loginData);//url&data
  }

  //storing token in localStorage
  public setToken(token:any){ //loginUser
    localStorage.setItem("token",token);
    console.log("set token"+token);
    return true;
  }

  //getting token
  public getToken(){
    return localStorage.getItem("token");
  }

  //setting userDetails in localStorage
  public setUser(user:any){
    localStorage.setItem("user",JSON.stringify(user));
    console.log("user set",user.phoneNumber);
  }

   //getting userDetails
   public getUser(){
    let userStr=localStorage.getItem("user");
    if(userStr!=null){return JSON.parse(userStr);}
    else{this.logout();return null;
    }
  }

  //Checking user is logged in or Not
  public isLoggedIn(){
    let token=localStorage.getItem("token");
    if(token==undefined||token==""||token==null){
      return false;   /*means user is logout*/
    }
    else{return true;} /*means user is log in*/
  }

  //Logout: remove token from localStorage
  public logout(){
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return true;
  }

  

  

 
 



}
