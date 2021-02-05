import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Account } from '../models/item';
import { AccountService } from '../services/account.service';
import { MustMatch } from '../models/CustomValidator';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private fb:FormBuilder, private accservice:AccountService, private userservice: UserService) { }
  signupForm:FormGroup


  ngOnInit(): void {
    this.signupForm = this.fb.group({
      fullname:['',Validators.required],
      username:['',[Validators.required]],
      email:['',[Validators.required, Validators.email]],
      password:['',[Validators.required]],
      confirmpassword:['',[Validators.required]]},

      {
        validator: MustMatch('password', 'confirmpassword')
      }
    );
  }

  onSignupForm(){
    let acc = new Account();
    acc.fullname = this.signupForm.controls["fullname"].value;
    acc.username = this.signupForm.controls["username"].value;
    acc.email = this.signupForm.controls["email"].value;
    acc.password = this.signupForm.controls["password"].value;

    console.log(acc);
    this.accservice.insertAccount(acc).subscribe(data=>console.log(data));
  }

  register(){
    let acc = new Account();
    acc.fullname = this.signupForm.controls["fullname"].value;
    acc.username = this.signupForm.controls["username"].value;
    acc.email = this.signupForm.controls["email"].value;
    acc.password = this.signupForm.controls["password"].value;
    this.userservice.signup(acc.email,acc.password).then(data=>console.log(data));
  }
}
