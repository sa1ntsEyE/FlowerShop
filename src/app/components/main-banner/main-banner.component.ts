import { Component } from '@angular/core';

@Component({
  selector: 'app-main-banner',
  templateUrl: './main-banner.component.html',
  styleUrl: './main-banner.component.scss'
})
export class MainBannerComponent {

  handleAlert () {
    alert('SSS')
  }
}
