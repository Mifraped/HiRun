import { Component, Input, OnInit } from '@angular/core';
import { Rate } from 'src/app/models/rate';
import { ResponseUser } from 'src/app/models/response-user';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-rating-card',
  templateUrl: './rating-card.component.html',
  styleUrls: ['./rating-card.component.css']
})
export class RatingCardComponent implements OnInit{

  @Input() rate: Rate

  rateUser:User
  constructor(public userService: UserService){}



  ngOnInit(): void {
    const id = this.rate.id_user
    //datos del usuario que ha puesto el rating
    this.userService.getUserInfo(id).subscribe((res:ResponseUser)=>{
      if (res.error){
        alert('error')
      }else{
        this.rateUser=res.data[0]
      }
    })
  }
}
