import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailsComponent } from "./Components/product-details/product-details.component";
import { ProductsbodyComponent } from "./Components/productsbody/productsbody.component";
import {HomeComponent} from "./Layouts/home/home.component";
import {AppComponent} from "./app.component";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'products', component: ProductsbodyComponent },
  { path: 'products', component: ProductsbodyComponent },
  { path: 'product/:id', component: ProductDetailsComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }