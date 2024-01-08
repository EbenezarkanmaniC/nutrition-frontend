import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Food } from 'src/app/model/Food';



@Injectable({
  providedIn: 'root'
})
export class FooditemsService {
  //for searchQuery
  
  querry:string="";
  pageNo:number=0;
  constructor(private http:HttpClient) { }
 //for searchQuery
  setQuerry(querry:any)
  {
    this.querry=querry;
    console.log(this.querry);
    //this.getFoodList();
  }
  
  //getting all food api from backened
  getFoodList():Observable<Food[]>{
    let token = localStorage.getItem("token");
    token = "Bearer "+token;

    const headers ={'Authorization': token }; 
    console.log(headers);
  
    let url="http://localhost:9191/nutrition/instantFood";
    if(this.querry!==""){
      url="http://localhost:9191/nutrition/instantFood/"+this.querry;
      //?query="+this.querry;
    }
    const observable:Observable<Food[]>=this.http.get<Food[]>(url,{headers});
    return observable;
    
  }
//getting userDetails
public getUser(){
  let userStr=localStorage.getItem("user");
  if(userStr!=null){return JSON.parse(userStr);}
    else{alert("User doesn't exist");return ""}

}

    //adding food in the favourite list
  addToFavourite(requestdata:Food):Observable<Food>{
    requestdata.phoneNumber=this.getUser().phoneNumber;
    let token = localStorage.getItem("token");
    token = "Bearer "+token;

    const headers ={'Authorization': token }; 
    console.log(headers);
    const url="http://localhost:9191/wishlist";
    const observable:Observable<Food>=this.http.post<Food>(url, requestdata,{headers});
    console.log(requestdata);
    console.log("food added");
    return observable;

  }
}
