import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';

interface ngOnChanges {
}

@Component({
  selector: 'app-user-order-list',
  templateUrl: './user-order-list.component.html',
  styleUrl: './user-order-list.component.scss'
})
export class UserOrderListComponent implements OnInit, ngOnChanges {
  @Input() orderData: any[] = [];
  shipping: number = 10;

  ngOnInit() {
    console.log('UserOrderListComponent initialized');
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['orderData']) {
      console.log('Order data changed:', changes['orderData'].currentValue);
    }
  }



}
