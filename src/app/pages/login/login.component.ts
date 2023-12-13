import { Component } from '@angular/core';
import { User } from 'src/app/models/user';
import { NgForm } from '@angular/forms'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public user: User = new User()

  public sendForm(form:NgForm){
    console.log(this.user);
  }

}
