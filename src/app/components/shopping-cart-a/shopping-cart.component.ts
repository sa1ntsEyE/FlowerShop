import {Component, inject, OnInit} from '@angular/core';
import { CartService } from '../../service/cart/cart.service';
import { Router } from '@angular/router';
import {AuthService} from '../../service/auth.service';

@Component({
  selector: 'app-shopping-cart-a',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  private cartService: CartService = inject(CartService);
  private router: Router = inject(Router);
  private authService: AuthService = inject(AuthService);
  couponCode: string = '';
  discount: number = 0;
  shipping = 10;
  validCoupons: { [key: string]: number } = {
    "DISCOUNT100": 100,
    "SAVE100": 100
  };
  user$ = this.authService.user$;

  constructor() {}

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
        cartItems: this.cartItems,
        discount: this.discount,
        couponCode: this.couponCode
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
