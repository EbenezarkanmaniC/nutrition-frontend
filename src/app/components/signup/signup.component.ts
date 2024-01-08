import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SignupService } from 'src/app/services/signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private signupService:SignupService,private snack:MatSnackBar) { }

//binding data of signup form in this user variable
phoneNumberRegex=/^\d{10,12}$/;
emailRegex=/^[a-zA-Z][a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  public user={
    userName:"",
    password:"",
    phoneNumber:"",
    country:"",
    email:""
  }

  ngOnInit(): void {
  }

  formSubmit(){
    console.log(this.user);
 if(this.user.userName.length < 5){ this.snack.open("Username must be at least 5 characters", "ok"); return;}
 if(this.user.password.length < 8){ this.snack.open("Password must be at least 8 characters", "ok"); return;}
 if(!/^\d{10,12}$/.test(this.user.phoneNumber)){ this.snack.open("Invalid phone number", "ok"); return;}
 if(this.user.country.length < 5){ this.snack.open("Country must be at least 5 characters", "ok"); return;}
 if(!/^[a-zA-Z][a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(this.user.email)){ this.snack.open("Invalid email address", "ok"); return;}
        
    /*This method will call once the user submit the form and 
    this method will call the addUser function from SignupService class, where 
    it will hit the backened or send the request to the backened(springboot)
    */
    this.signupService.addUser(this.user).subscribe(
      (data)=>{// for success
        console.log(data);
        this.snack.open("You are registered Successfully!!  ","",{duration:2000});
        window.location.href="/login";
      },
      (error)=>{//for in case of error
         console.log(error);
         this.snack.open("Username already exists.!! Please use a different one","ok");
      }
    )
  }
}
