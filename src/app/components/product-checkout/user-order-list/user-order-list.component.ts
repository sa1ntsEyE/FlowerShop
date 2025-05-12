import { Component, Input, OnInit, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { order } from '../../../service/order/order.service';

@Component({
  selector: 'app-user-order-list',
  templateUrl: './user-order-list.component.html',
  styleUrls: ['./user-order-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserOrderListComponent implements OnInit, OnChanges {
  @Input() orderData: any[] = [];
  shipping: number = 10;
  orderItems: any[] = [];

  constructor(private orderService: order) {}

  ngOnInit() {
    console.log('UserOrderListComponent initialized');
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['orderData'] && changes['orderData'].currentValue) {
      const orders = changes['orderData'].currentValue;
      if (orders.length > 0 && orders[0].orderTime) {
        this.saveOrders(orders);
        // Предполагаем, что товары находятся в orders[0].cartItems
        this.orderItems = [...orders[0].cartItems];
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

  trackById(index: number, item: any): any {
    return item.id;
  }
}
