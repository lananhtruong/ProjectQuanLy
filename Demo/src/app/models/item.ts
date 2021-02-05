export interface Item {
  ID?: string; Name?: string; Color?: string; Size?: string; Price?: string; Image?: string; Status?:string;
}
export class Account {fullname: string; username:string; email: string; password: string;}
export interface UserI{email:string; password:string;}

export class ItemDescription {
  id: string;
  name: string;
  color: string;
  size:string;
}
