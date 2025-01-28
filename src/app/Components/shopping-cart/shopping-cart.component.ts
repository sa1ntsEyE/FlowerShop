import { Component } from '@angular/core';
import { CartService } from "../../service/cart/cart.service";

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.scss'
})
export class ShoppingCartComponent {
  constructor(private cartService: CartService) {}
  addtoCart = this.cartService.addToCart;


  get cartItems() {
    return this.cartService.getCartItems();
  }

  get cartTotal() {
    return this.cartService.getTotalAmount();
  }

  getItemTotal(productId: number) {
    return this.cartService.getTotalItem(productId);
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
}
