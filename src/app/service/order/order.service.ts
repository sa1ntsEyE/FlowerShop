import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root',
})
export class order {
  constructor(
      private firestore: AngularFirestore,
      private auth: AngularFireAuth
  ) {}

  private getSessionId(): string {
    let id = localStorage.getItem('session_id');
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem('session_id', id);
    }
    return id;
  }

  private async isOrderAlreadySaved(docPath: string, orderId: string): Promise<boolean> {
    const docSnap = await this.firestore.doc(docPath).get().toPromise();
    const data: any = docSnap?.data();
    const orders = data?.orders || [];
    return orders.some((o: any) => o.id === orderId);
  }

  async saveOrder(order: any) {
    const user = await this.auth.currentUser;
    const now = new Date();

    const orderId = order.id || crypto.randomUUID();
    const orderEntry = {
      ...order,
      id: orderId,
      createdAt: now,
    };

    if (!orderId) {
      console.warn('Order must have a unique "id" field to prevent duplicates.');
      return;
    }

    const path = user ? `userOrders/${user.uid}` : `sessionOrders/${this.getSessionId()}`;
    const docRef = this.firestore.doc(path);
    const docSnap = await docRef.get().toPromise();
    const data: any = docSnap?.data() || {};
    const orders: any[] = data.orders || [];

    const isDuplicate = orders.some(o => o.id === orderId);
    if (isDuplicate) {
      console.log('Order is already saved, skipping...');
      return;
    }

    const updatedOrders = [...orders, orderEntry];

    await docRef.set({
      ...(user ? { userId: user.uid } : { sessionId: this.getSessionId() }),
      updatedAt: now,
      orders: updatedOrders
    }, { merge: true });
  }

  async getOrders(): Promise<any[]> {
    const user = await this.auth.currentUser;
    const path = user
        ? `userOrders/${user.uid}`
        : `sessionOrders/${this.getSessionId()}`;

    const docSnap = await this.firestore.doc(path).get().toPromise();
    const data: any = docSnap?.data();
    return data?.orders || [];
  }

}
