import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailsComponent } from "./Components/product-details/product-details.component";
import { ProductsbodyComponent } from "./Components/productsbody/productsbody.component";
import {HomeComponent} from "./Layouts/home/home.component";
import {AppComponent} from "./app.component";
import { ShopComponent } from "./Layouts/shop/shop.component";
import { ShoppingCartComponent} from "./Components/shopping-cart/shopping-cart.component";
import {ProductCheckoutComponent} from "./Components/product-checkout/product-checkout.component";

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'shop',
    component: ShopComponent,
    children: [
      { path: '', component: ShoppingCartComponent },
      { path: 'product/:id', component: ProductDetailsComponent },
      { path: 'check-out' , component: ProductCheckoutComponent }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }