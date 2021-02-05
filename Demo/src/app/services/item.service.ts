import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Item, ItemDescription} from '../models/item';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  itemsCollection:AngularFirestoreCollection<Item>;
  items:Observable<Item[]>;
  itemDoc:AngularFirestoreDocument<Item>;

  constructor(private http:HttpClient, public afs: AngularFirestore) {
    this.itemsCollection = afs.collection<Item>('posts');
    this.itemsCollection=afs.collection<Item>('Items', ref=>ref.orderBy('NAME', 'asc'));
    this.items=this.itemsCollection.valueChanges({idField: 'id1'});
    this.items.subscribe(data=>{console.log(data)});
   }
  getItems():Observable <Item[]>{
    return this.http.get<Item[]>('http://localhost:8000/api/items/');
  }

  insertItem(item:ItemDescription): Observable<ItemDescription> {
    return this.http.post<ItemDescription>('http://localhost:8000/api/item', item);}

  addItem(item: Item){
    this.itemsCollection.add(item); //id dc tao tu dong
    //const docId=this.afs.createId();
    //this.itemsCollection.doc(docId).set(Object.assign{}, item);
   }
   public preAddAndUpdatePost(post:Item): void{
     this.savePost(post)
  }
  private savePost(post:Item){
    const addNew = {
      ID: post.ID,
      Name: post.Name,
      Color: post.Color,
      Size: post.Size,
      Price: post.Price,
      Image: post.Image,
    };
    console.log('abc',addNew)
      this.itemsCollection.doc(post.ID).set(Object.assign({}, addNew));
  }
  public deletePostById(post: Item){
    return this.itemsCollection.doc(post.ID).delete();
  }
  public editPostById(post: Item){
    return this.itemsCollection.doc(post.ID).update(post);
  }
}
