import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Food } from 'src/app/model/Food';
import { HttpClient } from '@angular/common/http';
import { LoginService } from './login.service';
import { wishlist } from '../model/wishlist';


@Injectable({
  providedIn: 'root'
})
export class FavouriteService {

  
  constructor(private client:HttpClient,private loginService:LoginService) { }

  //getting favourite food list
  getFoodList():Observable<wishlist[]>{
    let token = localStorage.getItem("token");
    token = "Bearer "+token;

    const headers ={'Authorization': token }; 
    console.log(headers);
    const url="http://localhost:9191/wishlist/"+this.loginService.getUser().phoneNumber;
    const observable:Observable<wishlist[]>=this.client.get<wishlist[]>(url,{headers});
    return observable;
  }

   //deleting favourite food for user
  removeItemFromFavourite(food:wishlist):Observable<wishlist>{
    const phoneNumber=food.phoneNumber;
    const id=food.id;
    let token = localStorage.getItem("token");
    token = "Bearer "+token;

    const headers ={'Authorization': token }; 
    console.log(headers);
    const url="http://localhost:9191/wishlist/deleteItem/"+phoneNumber+"/"+id;
    console.log(url);
    const observable:Observable<wishlist>=this.client.delete<wishlist>(url,{headers});
    return observable;

  }

}
