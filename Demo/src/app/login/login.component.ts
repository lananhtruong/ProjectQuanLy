import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthService } from '../services/auth.service';
import { Router} from '@angular/router';
import { UserI } from '../models/item';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private fb:FormBuilder,public authService: AuthService, private router: Router) { }
  loginForm=new FormGroup({
    email:new FormControl('',[Validators.required,Validators.email]),
    password: new FormControl('',Validators.required),
  })

  ngOnInit(): void {
  }

  onLogin(form: UserI){
    this.authService
    .loginByEmail(form)
    .then(res =>{
      console.log('Successfully', res);
      location.href = "/admin/main"
    })
    .catch(err => console.log('error', err));
  }

  tryGoogleLogin(){
    this.authService.signinGmail()
     .then(res=>{
       //this.router.navigate(["/"]);
       location.href="/admin/main"
       }).catch(err=>{
         console.log(err);

       })
   }


}
