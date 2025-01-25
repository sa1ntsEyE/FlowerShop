import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems: any[] = [];

  getCartItems() {
    return this.cartItems;
  }

  addToCart(product: any) {
    const existingItem = this.cartItems.find(item => item.id === product.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.cartItems.push({ ...product, quantity: 1 });
    }
  }

  removeFromCart(productId: number) {
    this.cartItems = this.cartItems.filter(item => item.id !== productId);
  }

  updateQuantity(productId: number, quantity: number) {
    const item = this.cartItems.find(item => item.id === productId);
    if (item) {
      item.quantity = quantity > 0 ? quantity : 1;
    }
  }

  getTotalAmount() {
    return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }
}
