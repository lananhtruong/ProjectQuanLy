import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {StatusLoginService} from '../services/status-login.service';
import { AuthService } from '../services/auth.service';
import { SharingService } from '../services/sharing.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  displayName:string="";

  constructor(private fb:FormBuilder, private status:StatusLoginService, private authService:AuthService, private sharingService:SharingService ) {
    this.sharingService.isUserLoggedIn
					.subscribe(value => {
									if(value){
										this.status.getCurrentUser()
											.then(user => {
															this.displayName = user.displayName!=null? user.displayName: user.email
															console.log(this.displayName);}
												).catch(e => {console.log(e);}
											);

								}
    });
  }
  navForm:FormGroup

  ngOnInit(): void {
    this.status.getCurrentUser()
					.then(user=> this.displayName = user.displayName!=null? user.displayName: user.email);

				console.log(this.displayName);
  }

  onNavForm(){
    alert("...")
  }

  Logout(){
    this.authService.logout();
    location.href="/";
  }

}
