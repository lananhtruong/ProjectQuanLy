import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import * as firebase from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
@Injectable({
  providedIn: 'root'
})
export class StatusLoginService {


  constructor(public db: AngularFirestore,	public afAuth: AngularFireAuth) {}

  getCurrentUser(){
    return new Promise<any>((resolve, reject) => {
      var user = this.afAuth.onAuthStateChanged(function(user){
      if (user) {
        resolve(user);
      } else {
        reject('No user logged in');
      }
      })
  })
  }

}
