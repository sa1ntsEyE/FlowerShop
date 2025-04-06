import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderDataService {
  private orderDataSubject = new BehaviorSubject<any[]>([]);
  orderData$ = this.orderDataSubject.asObservable();

  setOrderData(data: any[]) {
    this.orderDataSubject.next(data);
  }
}
