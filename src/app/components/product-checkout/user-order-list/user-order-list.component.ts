import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { order } from '../../../service/order/order.service';

@Component({
  selector: 'app-user-order-list',
  templateUrl: './user-order-list.component.html',
  styleUrls: ['./user-order-list.component.scss']
})
export class UserOrderListComponent implements OnInit, OnChanges {
  @Input() orderData: any[] = [];
  shipping: number = 10;

  constructor(private orderService: order) {}

  ngOnInit() {
    console.log('UserOrderListComponent initialized');
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['orderData'] && changes['orderData'].currentValue) {
      const orders = changes['orderData'].currentValue;
      // Убедитесь, что в данных есть orderTime
      if (orders.length > 0 && orders[0].orderTime) {
        this.saveOrders(orders);
      } else {
        console.error('Order data is missing orderTime!');
      }
    }
  }


  private async saveOrders(orders: any[]) {
    for (let order of orders) {
      try {
        await this.orderService.saveOrder(order);
        console.log('Order saved');
      } catch (error) {
        console.error('Error saving order:', error);
      }
    }
  }

  protected readonly order = order;
}
