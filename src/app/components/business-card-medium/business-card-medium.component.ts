import { Component, Input, OnInit } from '@angular/core';
import { Business } from 'src/app/models/business';

import { BusinessService } from 'src/app/shared/business.service';

@Component({
  selector: 'app-business-card-medium',
  templateUrl: './business-card-medium.component.html',
  styleUrls: ['./business-card-medium.component.css'],
})
export class BusinessCardMediumComponent {
  business = this.businessService.business;

  constructor(public businessService: BusinessService) {}
}
