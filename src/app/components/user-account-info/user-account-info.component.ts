import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { order} from '../../service/order/order.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-user-account-info',
  templateUrl: './user-account-info.component.html',
  styleUrls: ['./user-account-info.component.scss']
})
export class UserAccountInfoComponent  {
  selectedSection: string = 'account';
  orders: any[] = [];

  constructor(
      private orderService: order
  ) {}

  selectSection(section: string) {
    this.selectedSection = section;
    if (section === 'orders') {
      this.loadOrders();
    }
  }

  async loadOrders() {
    this.orders = await this.orderService.getOrders();
  }

  getCartItems(order: any): any[] {
    return order?.cartItems || [];
  }

  formatOrderDate(date: any): string {
    if (!date) return 'No date';
    try {
      const jsDate = typeof date.toDate === 'function' ? date.toDate() : new Date(date);
      return new Intl.DateTimeFormat('en-GB', {
        year: 'numeric', month: 'short', day: 'numeric',
        hour: '2-digit', minute: '2-digit'
      }).format(jsDate);
    } catch (e) {
      return 'Invalid date';
    }
  }
}
