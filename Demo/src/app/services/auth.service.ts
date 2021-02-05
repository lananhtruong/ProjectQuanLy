import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import {SharingService} from '../services/sharing.service';
import { UserI } from '../models/item';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private afAuth: AngularFireAuth,
    private router:Router,
    private dataSharingService:SharingService) { }

    async signinGmail(){
			var provider = new firebase.auth.GoogleAuthProvider();
			provider.addScope('profile');
			provider.addScope('email');
			return await  this.afAuth.signInWithPopup(provider)
              .then(res=>{
                console.log("Đăng nhập thành công")
                this.dataSharingService.isUserLoggedIn.next(true);
				//  this.router.navigate(['home']);
                // this.router.navigate(['home']);
				})
    }

    // siginFirebase(email: string, password:string){
		// 	return new Promise<any>((resolve, reject) => {
		// 	  this.fauth.signInWithEmailAndPassword(email, password)
		// 	  .then(res => {

		// 		resolve(res);
		// 		//this.sharingService.isUserLoggedIn.next(true);
		// 	  }, err => reject(err))
    // 	})

    AuthLogin(provider) {
      return this.afAuth.signInWithPopup(provider)
      .then((_result) => {
          console.log('You have been successfully logged in!')
          alert('login thành công')
        location.href = "/admin/main"

      }).catch((error) => {
          console.log(error)
      })
    }

    loginByEmail(user: UserI) {
      const { email, password} = user;
      return this.afAuth.signInWithEmailAndPassword(email, password);

    }

    logout(){
			return new Promise<any>((resolve,reject)=>{
			  if (this.afAuth.currentUser){
			  //if (this.fauth.auth.currentUser){

				this.afAuth.signOut();
				resolve("log out");
			  }else{
				reject();
			  }

			})
		}
}
