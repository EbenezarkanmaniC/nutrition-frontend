import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Food } from 'src/app/model/Food';
import { wishlist } from 'src/app/model/wishlist';
import { FavouriteService } from 'src/app/services/favourite.service';


@Component({
  selector: 'app-list-favourite-item',
  templateUrl: './list-favourite-item.component.html',
  styleUrls: ['./list-favourite-item.component.css'],
})
export class ListFavouriteItemComponent {
  expandToggleFlag = false;
  // foodArray:Food[]=new FoodUtill().convertToFoodItem(result);
  foodArray: wishlist[] | undefined;
  errorMsg: String | undefined;
  deletedFoodItm: wishlist | undefined;

  constructor(private service: FavouriteService,private snack:MatSnackBar) {
    this.fetchAllFoodItems();
    console.log(this.foodArray);
  }
  expandedFoodItem: wishlist | undefined;
  expandToggle(foodItem: wishlist) {
    this.expandToggleFlag = !this.expandToggleFlag;
    this.expandedFoodItem = foodItem; // Set the expanded food item
    console.log(this.expandToggleFlag);
   }
  fetchAllFoodItems() {
    const observer = {
      next: (result: wishlist[]) => {
        console.log("type"+typeof result);
        this.foodArray = result;
        console.log(this.foodArray);
      },
      error: (error: HttpErrorResponse) => {
        this.errorMsg = error.error;
        console.log(this.errorMsg);
        if(this.errorMsg=="No Food found"){
          this.snack.open("Basket is empty. Please mark some food as favourite","",{duration:1500});
          setTimeout(function(){ window.location.href="/food";},1500);
        }
        
      },
    };
    const observable: Observable<wishlist[]> = this.service.getFoodList();
    observable.subscribe(observer);
    console.log("items+",observable)
  }

  removeFoodItem(foodItem: wishlist) {
    this.snack.open("Food is removed from Successfully !!  ","",{duration:1000});
    console.log(foodItem);
    
    const observer = {
      next: (result: wishlist) => {
        this.deletedFoodItm = result;
        this.fetchAllFoodItems();
      },
      error: (error: Error) => {
        this.errorMsg = error.message;
      },
    };
    const observable: Observable<wishlist> =
      this.service.removeItemFromFavourite(foodItem);
    observable.subscribe(observer);
  }
}
