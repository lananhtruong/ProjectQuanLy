import { Component, OnInit } from '@angular/core';
import { ItemService } from '../services/item.service';
import { Observable } from 'rxjs';
import {Item, ItemDescription} from '../models/item';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {

  constructor(private itemService: ItemService, private fb: FormBuilder) { }
  itemList: Observable<Item[]>;
  itemList1: Item[];
  itemForm:FormGroup

  ngOnInit(): void {
    this.itemList = this.itemService.getItems();
    this.itemService.getItems().subscribe(data => this.itemList1 = data)

    this.itemForm = this.fb.group({
      ID:['',Validators.required],
      Name:['',[Validators.required]],
      Color:['',[Validators.required, Validators.email]],
      Size:['',[Validators.required]],
    });
  }

  onItem(){
    let item = new ItemDescription();
    item.id = this.itemForm.controls["ID"].value;
    item.name = this.itemForm.controls["Name"].value;
    item.color = this.itemForm.controls["Color"].value;
    item.size = this.itemForm.controls["Size"].value;

    console.log(item);
    this.itemService.insertItem(item).subscribe(data=>console.log(data));
  }

}
