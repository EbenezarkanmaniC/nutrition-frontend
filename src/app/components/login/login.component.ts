import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from 'src/app/services/login.service';
@Component({
 selector: 'app-login',
 templateUrl: './login.component.html',
 styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    constructor( private loginService: LoginService, private snack: MatSnackBar) {}
    phoneNumberRegex=/^\d{10,12}$/;
 // binding data of login form in this user variable
 public loginData = {
  phoneNumber: "",
  password: ""
 }
 ngOnInit(): void {
 }
 loginFormSubmit() {
    if(this.loginData.password.length < 8){ this.snack.open("Password must be at least 8 characters", "ok"); return;}
 if(!/^\d{10,12}$/.test(this.loginData.phoneNumber)){ this.snack.open("Invalid phone number", "ok"); return;}
 
    
  if (this.loginData.password.trim() == "" || this.loginData.password == null) {
   this.snack.open("Password is required", "ok");
   return;
  }
  // request to server to generate token
  this.loginService.generateToken(this.loginData).subscribe(
   (data: any) => { // for success
    console.log("User Logged in Successfully");
    console.log(data);
    const user = {
     "phoneNumber": this.loginData.phoneNumber,
     "password": this.loginData.password
    };console.log(user.phoneNumber);
    console.log(user.password);
    // login...
    this.loginService.setToken(data.Token);
    console.log("set token login component "+data.Token);
    // will get the session for the current user
    // this.loginService.getCurrentUser().subscribe(
    
     this.loginService.setUser(user);
     console.log(user.phoneNumber);
     console.log(user.password);
     // redirect....to food Module
     window.location.href = "/home";
    
    // )
   },
   (error) => { // for in case of error
    console.log(error);
    this.snack.open("Invalid Details !! Try again", "ok");
   }
  );
 }
 



}
