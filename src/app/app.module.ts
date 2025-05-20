import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import {MatSliderModule} from "@angular/material/slider";
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import {AngularFireModule} from "@angular/fire/compat";
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import {FormsModule} from "@angular/forms";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from "@angular/forms";
import { DatePipe } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {environment} from "../../environment/environment";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HomeComponent } from './Layouts/home/home.component';
import { ShopComponent } from './Layouts/shop/shop.component';

import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { MainBannerComponent } from './components/main-banner/main-banner.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ProductsbodyComponent } from './components/productsbody/productsbody.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CartfindmoreComponent } from './components/cartfindmore/cartfindmore.component';
import { OurBlogPostsComponent } from './components/our-blog-posts/our-blog-posts.component';
import { FooterComponent } from './components/footer/footer.component';
import { ReletedproductsComponent } from './components/reletedproducts/reletedproducts.component';
import { ShoppingCartComponent } from './components/shopping-cart-a/shopping-cart.component';
import { ProductCheckoutComponent } from './components/product-checkout/product-checkout.component';
import { UserOrderListComponent } from './components/product-checkout/user-order-list/user-order-list.component';
import { AccountComponent } from './Layouts/account/account.component';
import { UserAccountInfoComponent } from './components/user-account-info/user-account-info.component';
import { ShoppingCartBComponent } from './components/shopping-cart-b/shopping-cart-b.component';
import { RandomCartComponent } from './components/random-cart/random-cart.component';
import { CartAbTestComponent } from './components-A_B-test/cart-ab-test/cart-ab-test.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    MainBannerComponent,
    SidebarComponent,
    ProductsbodyComponent,
    ProductDetailsComponent,
    HomeComponent,
    CartfindmoreComponent,
    OurBlogPostsComponent,
    FooterComponent,
    ReletedproductsComponent,
    ShopComponent,
    ShoppingCartComponent,
    ProductCheckoutComponent,
    UserOrderListComponent,
    AccountComponent,
    UserAccountInfoComponent,
    ShoppingCartBComponent,
    RandomCartComponent,
    CartAbTestComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp({
      "projectId":"flowershop-15faa",
      "appId":"1:541465629622:web:dd3219fdfd714a830c6717",
      "storageBucket":"flowershop-15faa.appspot.com",
      "apiKey":"AIzaSyDwZ18TS6Am9awxZIKh6clCSxUJXDAQVfg",
      "authDomain":"flowershop-15faa.firebaseapp.com",
      "messagingSenderId":"541465629622"})),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    FormsModule,
    NgbModule,
    MatSliderModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgChartsModule
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
