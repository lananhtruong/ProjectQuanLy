import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { HomeComponent } from './home/home.component';
import { ItemListComponent } from './item-list/item-list.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

import { MainLayoutComponent } from './main-layout/main-layout.component';
import { AuthGuard } from './guards/auth.guard';



const routes: Routes = [

  {path:"admin",component:MainLayoutComponent,
  //canActivate:[AuthGuard],//khai báo guard dùng để ràng buộc phải đăng nhập mới được vào
  children:[
    {path:"item",component:ItemListComponent},
    {path:"main",component:MainComponent}, //mặc định localhost:4200/admin sẽ load ItemListComponent
                      //được nhúng vào MainLayoutComponent
  ]},
  {path:"signup",component:SignupComponent},
  {path:"login", component: LoginComponent},
{path:'**', component:LoginComponent},// '**' có ý nghĩa nếu không có path nào khớp với các path đã khai báo trong routes
                  //thì mặc định sẽ chuyển hướng load LoginComponent
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
