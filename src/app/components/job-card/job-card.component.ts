import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-job-card',
  templateUrl: './job-card.component.html',
  styleUrls: ['./job-card.component.css']
})
export class JobCardComponent {
@Input() job:any

bookService(){
//pendiente creación página de reserva
this.router.navigate([`/book-service/:${this.job.jobId}`]);
console.log('reserva')
}

cardExtended:boolean = false

expandInfo(){
  this.cardExtended=!this.cardExtended
  console.log(this.cardExtended)
}
constructor(private router: Router) { }
}
