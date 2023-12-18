import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/user.service';


@Component({
  selector: 'app-job-card',
  templateUrl: './job-card.component.html',
  styleUrls: ['./job-card.component.css']
})
export class JobCardComponent {
@Input() job:any

bookService(){
  if (this.userService.connected){
this.router.navigate([`/book-service/:${this.job.jobId}`]);
   
  }else{
    alert('inicia sesión para reservar')
    this.router.navigate(['/login'])
  }
  

}

cardExtended:boolean = false

expandInfo(){
  this.cardExtended=!this.cardExtended
  console.log(this.cardExtended)
}
constructor(private router: Router, private userService:UserService) { }
}
