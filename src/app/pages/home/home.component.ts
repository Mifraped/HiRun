import { Component } from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('slideDown', [
      state(
        'void',
        style({
          transform: 'translateY(-20px)',
          opacity: '0',
        })
      ),
      state(
        '*',
        style({
          transform: 'translateY(0)',
          opacity: '1',
        })
      ),
      transition('void <=> *', animate('500ms ease-in-out')),
    ]),
  ],
})
export class HomeComponent {
  faqItems = [
    {
      question: 'First question',
      answer: 'Answer to the first question',
    },
    {
      question: 'Second question',
      answer: 'Answer to the second question',
    },
    {
      question: 'Third question',
      answer: 'Answer to the third question',
    },
    {
      question: 'Fourth question',
      answer: 'Answer to the fourth question',
    },

    // Add more FAQ items here
  ];

  constructor(public UserService: UserService) {}
  isPVisible = Array(this.faqItems.length).fill(false);

  togglePVisibility(index: number) {
    this.isPVisible[index] = !this.isPVisible[index];
  }
}
