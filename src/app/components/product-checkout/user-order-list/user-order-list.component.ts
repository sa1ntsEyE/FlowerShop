import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { order } from '../../../service/order/order.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {NgbRatingConfig} from '@ng-bootstrap/ng-bootstrap';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-user-order-list',
  templateUrl: './user-order-list.component.html',
  styleUrls: ['./user-order-list.component.scss']
  // Уберите ChangeDetectionStrategy.OnPush на время отладки
})
export class UserOrderListComponent implements OnInit, OnChanges {
  @Input() orderData: any[] = [];
  @Output() ratingSent = new EventEmitter<void>();
  shipping: number = 10;
  orderItems: any[] = [];
  rating: number = 0;
  ratingSubmitted: boolean = false;

  constructor(
      private orderService: order,
      private firestore: AngularFirestore,
      config : NgbRatingConfig
  ) {
    config.max = 5;
    config.readonly = false;
  }


  ngOnInit() {
    console.log('UserOrderListComponent initialized');
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['orderData'] && changes['orderData'].currentValue) {
      const orders = changes['orderData'].currentValue;
      if (orders.length > 0 && orders[0].orderTime) {
        this.saveOrders(orders);
        this.orderItems = [...orders[0].cartItems];
      } else {
        console.error('Order data is missing orderTime!');
      }
    }
  }

  async submitRating() {
    if (this.rating > 0) {
      const cartVariant = localStorage.getItem('cartVariant') || 'unknown';
      const fieldToUpdate = cartVariant === 'A' ? 'A' : 'B';

      try {
        const docRef = this.firestore.collection('A_B').doc('ratings');
        await docRef.set({
          [fieldToUpdate]: firebase.firestore.FieldValue.arrayUnion({
            rating: this.rating,
            timestamp: new Date()
          })
        }, { merge: true });

        this.ratingSubmitted = true;
        this.ratingSent.emit();
        console.log('Rating saved to Firestore');
      } catch (err) {
        console.error('Error saving rating:', err);
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
}
