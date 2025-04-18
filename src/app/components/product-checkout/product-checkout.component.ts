import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-checkout',
  templateUrl: './product-checkout.component.html',
  styleUrls: ['./product-checkout.component.scss']
})
export class ProductCheckoutComponent implements OnInit {
  cartItems: any[] = [];
  discount: number = 0;
  couponCode: string = '';
  shipping: number = 10;
  checkoutForm: FormGroup;
  orderData: any[] = [];

  constructor() {
    this.checkoutForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      streetAddress: new FormControl('', Validators.required),
      apartment: new FormControl(''),
      state: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      phoneNumber: new FormControl('', Validators.required),
      differentAddress: new FormControl(false),
      orderNotes: new FormControl(''),
      paymentMethod: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
    if (typeof window !== 'undefined' && window.history) {
      const navigation = window.history.state;
      console.log('Navigation data:', navigation);
      if (navigation) {
        this.cartItems = navigation['cartItems'] || [];
        this.discount = navigation['discount'] || 0;
        this.couponCode = navigation['couponCode'] || '';
      }
    } else {
      console.warn('History is not available!');
    }
  }

  getSubtotal() {
    return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  getTotal() {
    return this.getSubtotal() - this.discount + this.shipping;
  }

  // onSubmit() {
  //   if (this.checkoutForm.valid) {
  //     this.orderData = [
  //       this.checkoutForm.value,
  //       this.checkoutForm.value.paymentMethod ,
  //       this.cartItems
  //     ];
  //     console.log(this.orderData);
  //   } else {
  //     console.log('Форма содержит ошибки! Выберите способ оплаты.');
  //   }
  // }

  onSubmit() {
    this.orderData = [
      this.checkoutForm.value,
      this.checkoutForm.value.paymentMethod ,
      this.cartItems
    ];
  }
}
