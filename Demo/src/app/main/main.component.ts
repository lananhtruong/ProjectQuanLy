import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import {Item} from '../models/item';
import { ItemService } from '../services/item.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  public insertForm = new FormGroup({
    ID: new FormControl('', Validators.required),
    Name: new FormControl('', Validators.required),
    Color: new FormControl('', Validators.required),
    Size: new FormControl('', Validators.required),
    Price: new FormControl('', Validators.required),
    Image: new FormControl('', Validators.required),
    Status: new FormControl('', Validators.required),
  })

  // ishighlight = true;
  private itemsCollection: AngularFirestoreCollection<Item>;
	items: Observable<Item[]>;
  constructor(private readonly afs: AngularFirestore, private itemService: ItemService) {
    this.itemsCollection = afs.collection<Item>('Items');
			// .valueChanges() is simple. It just returns the
			// JSON data without metadata. If you need the
			// doc.id() in the value you must persist it your self
			// or use .snapshotChanges() instead. Only using for versions 7 and earlier

			 //this.items = this.itemsCollection.valueChanges();
       this.items = this.itemsCollection.valueChanges( { idField: 'id1' }); //chỉ sử dụng cho version mới nhất Angular 8,9
       //id1: ten field đại diện cho documnent id, lưu ý không
       //được đặt trùng với tên field khai báo trong dữ liệu

       this.items.subscribe(data=>{console.log(data)})
  }



  ngOnInit(): void {
  }

  // add(name:string="add name"){

  //   let item : Item = {};
  //   item.Name = name
  //   this.itemsCollection.add(item); //set id tự động

  //   let docid = "id1";
  //   this.itemsCollection.doc(docid).set(Object.assign({}, item));
  //   //Object.assign({} khong co lenh nay thi se khong them vao firebase duoc
  // }

  // update(name:string="update item"){
  //   let docId = "W6hwAX5KWTGOzUXvfX2S"
  //   let item : Item = {};
  //   item.Name = name
  //   this.itemsCollection.doc(docId).update(item);
  // }

  // delete(docId = "W6hwAX5KWTGOzUXvfX2S"){
  //   this.itemsCollection.doc(docId).delete();
  // }

  onInsert(data: Item){
      console.log('Add new', data);
      this.itemService.preAddAndUpdatePost(data);
  }

  onDeletePost(post: Item){

    this.itemService.deletePostById(post);
    alert('Delete Success !!!')
  }

  onEditPost(post: Item){
    console.log(post)
    this.insertForm.controls["ID"].setValue(post.ID)
    this.insertForm.controls["Name"].setValue(post.Name)
    this.insertForm.controls["Color"].setValue(post.Color)
    this.insertForm.controls["Size"].setValue(post.Size)
    this.insertForm.controls["Price"].setValue(post.Price)
    this.insertForm.controls["Image"].setValue(post.Image)
    this.insertForm.controls["Status"].setValue(post.Image)
    this.itemService.editPostById(post);
  }
}
