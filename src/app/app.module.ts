import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import {MatSliderModule} from "@angular/material/slider";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import {AngularFireModule} from "@angular/fire/compat";
import {environment} from "../../environment/environment";
import { LoginComponent } from './Components/login/login.component';
import {FormsModule} from "@angular/forms";
import { HeaderComponent } from './Components/header/header.component';
import { MainBannerComponent } from './Components/main-banner/main-banner.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SidebarComponent } from './Components/sidebar/sidebar.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ProductsbodyComponent } from './Components/productsbody/productsbody.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    MainBannerComponent,
    SidebarComponent,
    ProductsbodyComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp({"projectId":"flowershop-15faa","appId":"1:541465629622:web:dd3219fdfd714a830c6717","storageBucket":"flowershop-15faa.appspot.com","apiKey":"AIzaSyDwZ18TS6Am9awxZIKh6clCSxUJXDAQVfg","authDomain":"flowershop-15faa.firebaseapp.com","messagingSenderId":"541465629622"})),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    FormsModule,
    NgbModule,
    MatSliderModule
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
