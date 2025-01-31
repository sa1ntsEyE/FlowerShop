import { Component, OnInit } from '@angular/core';
import { CartService } from "../../service/cart/cart.service";
import { Router } from '@angular/router';
import {AuthService} from "../../service/auth.service";

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  couponCode: string = '';
  discount: number = 0;
  shipping = 10;
  validCoupons: { [key: string]: number } = {
    "DISCOUNT100": 100,
    "SAVE100": 100
  };

  constructor(private cartService: CartService, private router: Router, private authService: AuthService) {}
  user$ = this.authService.user$;


  ngOnInit() {}

  get cartItems() {
    return this.cartService.getCartItems();
  }

  get cartTotal() {
    const total = this.cartService.getTotalAmount();
    return total - this.discount;
  }

  getItemTotal(productId: number) {
    return this.cartService.getTotalItem(productId);
  }

  proceedToCheckout() {
    this.router.navigate(['/shop/check-out'], {
      state: {
        cartItems: this.cartItems,   // Передаем товары из корзины
        discount: this.discount,      // Передаем скидку
        couponCode: this.couponCode  // Передаем код купона
      }
    });
  }

  incrementQuantity(productId: number) {
    const item = this.cartItems.find(item => item.id === productId);
    if (item) {
      this.cartService.updateQuantity(productId, item.quantity + 1);
    }
  }

  decrementQuantity(productId: number) {
    const item = this.cartItems.find(item => item.id === productId);
    if (item) {
      this.cartService.updateQuantity(productId, item.quantity - 1);
    }
  }

  removeFromCart(productId: number) {
    this.cartService.removeFromCart(productId);
  }

  applyCoupon() {
    if (this.validCoupons[this.couponCode]) {
      this.discount = this.validCoupons[this.couponCode];
    } else {
      alert('Invalid coupon code');
    }
  }
}
