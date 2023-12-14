import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-job-card',
  templateUrl: './job-card.component.html',
  styleUrls: ['./job-card.component.css']
})
export class JobCardComponent {
@Input() job:any

bookService(){
//pendiente creación página de reserva
console.log('reserva')
}

cardExtended:boolean = false

expandInfo(){
  this.cardExtended=!this.cardExtended
  console.log(this.cardExtended)
}
}
