import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';
import { ProductsService } from '../../service/Products/products.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-reletedproducts',
  templateUrl: './reletedproducts.component.html',
  styleUrls: ['./reletedproducts.component.scss'],
})
export class ReletedproductsComponent implements OnInit {
  products = this.productsService.products;
  paginatedProducts: any[] = [];
  currentPage: number = 0;
  itemsPerPage: number = 5;
  touchStartX: number = 0;
  touchEndX: number = 0;

  constructor(
      private productsService: ProductsService,
      private renderer: Renderer2,
      private el: ElementRef,
      private router: Router
  ) {}

  ngOnInit() {
    this.paginateProducts();
    this.addSwipeListeners();
  }

  goToProductDetails(productId: number) {
    console.log('Attempting to navigate to product:', productId);
    this.router.navigate(['/shop/product', productId]).then(
        success => console.log('Navigation success:', success),
        error => console.error('Navigation error:', error)
    );
  }

  paginateProducts() {
    this.paginatedProducts = [];
    for (let i = 0; i < this.products.length; i += this.itemsPerPage) {
      this.paginatedProducts.push(
          this.products.slice(i, i + this.itemsPerPage)
      );
    }
  }

  setPage(index: number) {
    if (index >= 0 && index < this.paginatedProducts.length) {
      this.currentPage = index;
    }
  }

  nextPage() {
    if (this.currentPage < this.paginatedProducts.length - 1) {
      this.setPage(this.currentPage + 1);
    }
  }

  prevPage() {
    if (this.currentPage > 0) {
      this.setPage(this.currentPage - 1);
    }
  }


  addSwipeListeners() {
    const slider = this.el.nativeElement.querySelector(
        '.reletedProducts--slider'
    );

    this.renderer.listen(slider, 'touchstart', (event: TouchEvent) => {
      this.touchStartX = event.touches[0].clientX;
    });

    this.renderer.listen(slider, 'touchmove', (event: TouchEvent) => {
      this.touchEndX = event.touches[0].clientX;
    });

    this.renderer.listen(slider, 'touchend', () => {
      this.handleSwipe();
    });
  }

  handleSwipe() {
    const threshold = 50; // Minimum swipe distance in pixels
    const deltaX = this.touchStartX - this.touchEndX;

    if (deltaX > threshold) {
      // Swipe left
      this.nextPage();
    } else if (deltaX < -threshold) {
      // Swipe right
      this.prevPage();
    }
  }
}