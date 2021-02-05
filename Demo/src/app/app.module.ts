import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { AngularFireAuthModule } from '@angular/fire/auth';//khai báo khi yêu cầu phải xác thực VD: trong chức năng update

import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MainComponent } from './main/main.component';
import { ItemListComponent } from './item-list/item-list.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

import {ReactiveFormsModule} from "@angular/forms";
import { SharingService } from './services/sharing.service';

import { MainLayoutComponent } from './main-layout/main-layout.component';
import { AuthGuard } from './guards/auth.guard';




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavComponent,
    SidebarComponent,
    MainComponent,
    ItemListComponent,
    LoginComponent,
    SignupComponent,

    MainLayoutComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
		AngularFirestoreModule,
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features=> dùng cho chức năng update
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [SharingService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
