import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-random-cart',
  templateUrl: './random-cart.component.html',
  styleUrls: ['./random-cart.component.scss']
})
export class RandomCartComponent implements OnInit {
  variant: 'A' | 'B' = 'A'; // Значення за замовчуванням

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      const savedVariant = localStorage.getItem('cartVariant');
      if (savedVariant === 'A' || savedVariant === 'B') {
        this.variant = savedVariant as 'A' | 'B';
      } else {
        this.variant = Math.random() < 0.5 ? 'A' : 'B';
        localStorage.setItem('cartVariant', this.variant);
      }
    }
  }
}
