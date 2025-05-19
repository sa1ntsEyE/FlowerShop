import { Component, inject } from '@angular/core';
import { CartService } from '../../service/cart/cart.service';
import { Router } from '@angular/router';
import { ModalService } from '../../service/modal-shop-b-cart/modal.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-shopping-cart-b',
  templateUrl: './shopping-cart-b.component.html',
  styleUrls: ['./shopping-cart-b.component.scss']
})
export class ShoppingCartBComponent {
  private cartService = inject(CartService);
  private router = inject(Router);
  public modalService = inject(ModalService);
  isVisible$: Observable<boolean> = this.modalService.isVisible$;

  discount = 0;
  couponCode = '';

  closeCart() {
    this.modalService.hide();
  }

  stopPropagation(event: Event) {
    event.stopPropagation();
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

  get cartItems() {
    return this.cartService.getCartItems();
  }

  get cartTotal() {
    return this.cartService.getTotalAmount() - this.discount;
  }

  getItemTotal(productId: number) {
    return this.cartService.getTotalItem(productId);
  }

  incrementQuantity(productId: number) {
    const item = this.cartItems.find(i => i.id === productId);
    if (item) this.cartService.updateQuantity(productId, item.quantity + 1);
  }

  decrementQuantity(productId: number) {
    const item = this.cartItems.find(i => i.id === productId);
    if (item) this.cartService.updateQuantity(productId, item.quantity - 1);
  }

  removeFromCart(productId: number) {
    this.cartService.removeFromCart(productId);
  }
}
