import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-checkout',
  templateUrl: './product-checkout.component.html',
  styleUrls: ['./product-checkout.component.scss']
})
export class ProductCheckoutComponent implements OnInit {
  cartItems: any[] = [];
  discount: number = 0;
  couponCode: string = '';
  shiping: number = 10;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // Извлекаем данные состояния маршрута
    const navigation = history.state;
    if (navigation) {
      this.cartItems = navigation['cartItems'] || [];
      this.discount = navigation['discount'] || 0;
      this.couponCode = navigation['couponCode'] || '';
    } else {
      console.log("No cart data found in state.");
    }
  }

  getSubtotal() {
    return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  getTotal() {
    return this.getSubtotal() - this.discount + this.shiping;
  }
}
