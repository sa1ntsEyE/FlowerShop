import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-checkout',
  templateUrl: './product-checkout.component.html',
  styleUrls: ['./product-checkout.component.scss']
})
export class ProductCheckoutComponent implements OnInit {
  cartItems: any[] = [];
  discount: number = 0;
  couponCode: string = '';
  shipping: number = 10;  // Стоимость доставки

  // Форма оформления заказа
  checkoutForm: FormGroup;

  constructor(private route: ActivatedRoute) {
    // Инициализируем форму
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
      paymentMethod: new FormControl('', Validators.required)  // Добавили метод оплаты с валидатором
    });


  }

  ngOnInit() {
    if (typeof window !== 'undefined' && window.history) {
      const navigation = window.history.state;  // Используем window.history для получения данных
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

  onSubmit() {
    if (this.checkoutForm.valid) {
      console.log('Форма отправлена:', this.checkoutForm.value);
      console.log('Выбранный способ оплаты:', this.checkoutForm.value.paymentMethod);
      console.log('Корзина товаров:', this.cartItems);
    } else {
      console.log('Форма содержит ошибки! Выберите способ оплаты.');
    }
  }

}
