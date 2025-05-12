import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { order } from '../../service/order/order.service';
import { Component, inject } from '@angular/core';
import { AuthErrorCodes } from 'firebase/auth';
import firebase from 'firebase/compat/app';
import { CartService } from '../../service/cart/cart.service';

@Component({
  selector: 'app-user-account-info',
  templateUrl: './user-account-info.component.html',
  styleUrls: ['./user-account-info.component.scss']
})
export class UserAccountInfoComponent {
  private cartService: CartService = inject(CartService);
  selectedSection: string = 'account';
  orders: any[] = [];
  wishlist: any[] = [];
  currentPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';

  constructor(
      private orderService: order,
      private firestore: AngularFirestore,
      private auth: AngularFireAuth
  ) {}

  selectSection(section: string) {
    this.selectedSection = section;
    if (section === 'orders') {
      this.loadOrders();
    } else if (section === 'wishlist') {
      this.loadWishlist();
    }
  }

  async loadOrders() {
    this.orders = await this.orderService.getOrders();
  }

  async loadWishlist() {
    const user = await this.auth.currentUser;
    if (user) {
      this.firestore
          .collection('users')
          .doc(user.uid)
          .collection('wishlist')
          .snapshotChanges()
          .subscribe((actions) => {
            this.wishlist = actions.map(a => {
              const data = a.payload.doc.data();
              const id = a.payload.doc.id;
              return { id, ...data };
            });
          });
    }
  }

  async changePassword() {
    if (this.newPassword !== this.confirmPassword) {
      alert('New passwords do not match.');
      return;
    }

    const user = await this.auth.currentUser;

    if (user) {
      try {
        // Переаутентификация пользователя с текущим паролем
        await user.reauthenticateWithCredential(
            firebase.auth.EmailAuthProvider.credential(user.email!, this.currentPassword)
        );

        // Изменение пароля
        await user.updatePassword(this.newPassword);
        alert('Password changed successfully.');
      } catch (error: any) {
        if (error.code === AuthErrorCodes.INVALID_PASSWORD) {
          alert('Current password is incorrect.');
        } else {
          alert('An error occurred while changing the password.');
        }
      }
    }
  }

  async removeFromWishlist(itemId: string) {
    const user = await this.auth.currentUser;
    if (!user) return;

    try {
      await this.firestore
          .collection('users')
          .doc(user.uid)
          .collection('wishlist')
          .doc(itemId)
          .delete();
    } catch (error) {
      console.error('Error removing item from wishlist:', error);
    }
  }

  // Проверка, можно ли отменить заказ (в течение 24 часов)
  canCancelOrder(order: any): boolean {
    const orderTime = order.createdAt ? order.createdAt.toDate() : new Date();
    const currentTime = new Date();
    const timeDiff = currentTime.getTime() - orderTime.getTime();
    const hoursDiff = timeDiff / (1000 * 3600); // Преобразуем миллисекунды в часы
    return hoursDiff <= 24;
  }

  // Функция для удаления заказа
  async cancelOrder(orderId: string) {
    const user = await this.auth.currentUser;
    if (!user) return;

    try {
      // Удаляем заказ из Firestore
      await this.firestore
          .collection('users')
          .doc(user.uid)
          .collection('orders')
          .doc(orderId)
          .delete();
      alert('Order cancelled successfully.');
    } catch (error) {
      console.error('Error cancelling order:', error);
    }
  }

  getItemTotal(productId: number) {
    return this.cartService.getTotalItem(productId);
  }

  isPasswordValid(): boolean {
    return this.newPassword === this.confirmPassword && this.newPassword.length >= 6;
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
