import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from "angular2-flash-messages";
import { ValidateService } from "./../../services/validate.service";
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username:string;
  password:string;

  constructor(
    private validateService: ValidateService,
    private flashMessagesService: FlashMessagesService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
  }

  onLoginSubmit(){
    const user = {
      username: this.username,
      password: this.password
    };

    // Required Fields
    if (!this.validateService.validateLoginUser(user)) {
      this.flashMessagesService.show('Please fill in all the fields', {
        cssClass: 'alert-danger',
        timeout: 3000
      });
      return false;
    }
    
    this.authService.authenticateUser(user).subscribe(data => {
      if (data.success) {
        this.authService.storeUserData(data.token, data.user);
        this.flashMessagesService.show('You are now logged in', {
          cssClass: 'alert-success',
          timeout: 3000
        });
        this.router.navigate(['/dashboard']);
      } else {
        this.flashMessagesService.show(data.messages, {
          cssClass: 'alert-danger',
          timeout: 3000
        });
      }
    });
  }

}
