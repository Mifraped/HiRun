import { Component, Input } from '@angular/core';
import { Rate } from 'src/app/models/rate';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-rating-card',
  templateUrl: './rating-card.component.html',
  styleUrls: ['./rating-card.component.css']
})
export class RatingCardComponent {

  @Input() rate: Rate

  constructor(public userService: UserService){}

}
