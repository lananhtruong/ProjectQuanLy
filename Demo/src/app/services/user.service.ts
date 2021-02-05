import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {Observable} from 'rxjs';
import * as firebase from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private fauth: AngularFireAuth, public db: AngularFirestore) { }

  signup(email: string, password:string){
    return new Promise<any>((resolve, reject)=>{
      this.fauth.createUserWithEmailAndPassword(email,password)
      .then(res => {
        resolve(res);
      }, err =>reject(err))
      alert("đăng ký thành công");
    })

  }


}




