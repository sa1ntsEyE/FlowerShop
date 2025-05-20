import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailsComponent } from "./components/product-details/product-details.component";
import { ProductsbodyComponent } from "./components/productsbody/productsbody.component";
import {HomeComponent} from "./Layouts/home/home.component";
import {AppComponent} from "./app.component";
import { ShopComponent } from "./Layouts/shop/shop.component";
import { ShoppingCartComponent} from "./components/shopping-cart-a/shopping-cart.component";
import {ProductCheckoutComponent} from "./components/product-checkout/product-checkout.component";
import {AccountComponent} from './Layouts/account/account.component';
import {RandomCartComponent} from './components/random-cart/random-cart.component';
import {CartAbTestComponent} from './components-A_B-test/cart-ab-test/cart-ab-test.component';
import {authEmailGuard} from './guards/auth-email.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'shop',
    component: ShopComponent,
    children: [
      { path: '', component: RandomCartComponent },
      { path: 'product/:id', component: ProductDetailsComponent },
      { path: 'check-out' , component: ProductCheckoutComponent }
    ]
  },
  { path: 'account-info', component: AccountComponent },

  // A/B тест только для нужного email
  {
    path: 'ab-test',
    component: CartAbTestComponent,
    canActivate: [authEmailGuard]
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }