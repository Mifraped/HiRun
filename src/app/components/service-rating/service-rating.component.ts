import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-service-rating',
  templateUrl: './service-rating.component.html',
  styleUrls: ['./service-rating.component.css']
})
export class ServiceRatingComponent {
  @Input() ratingInput: number;

}
