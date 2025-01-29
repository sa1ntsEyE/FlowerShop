import { Component, OnInit, Input } from '@angular/core';
import { ProductsService } from "../../service/Products/products.service";
import { ProductsAll } from "../../../models/products";
import { CheckboxstateService } from "../../service/checkboxState/checkboxstate.service";
import { Router } from '@angular/router';
import { CartService } from "../../service/cart/cart.service";

@Component({
  selector: 'app-productsbody',
  templateUrl: './productsbody.component.html',
  styleUrls: ['./productsbody.component.scss']
})

export class ProductsbodyComponent implements OnInit {
  products: Array<ProductsAll> = [];
  filteredProducts: Array<ProductsAll> = [];
  currentPage: number = 1;
  itemsPerPage: number = 9;
  totalItems: number = 0;
  totalPages: number = 0;
  pageNumbers: number[] = [];

  constructor(
      private productsService: ProductsService,
      private checkboxService: CheckboxstateService,
      private router: Router,
      private cartService: CartService
  ) {}

  addToCart(product: any) {
    this.cartService.addToCart(product);
    console.log(`${product.name} добавлен в корзину`);
  }

  ngOnInit() {
    console.log('ProductsbodyComponent initialized');
    this.checkboxService.filteredProducts$.subscribe(products => {
      this.filteredProducts = products;
      this.totalItems = products.length;
      this.calculateTotalPages();
      this.paginateProducts();
      // console.log('Filtered products updated:', products.length);
    });
  }

  setPage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.paginateProducts();
  }

  paginateProducts() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.products = this.filteredProducts.slice(startIndex, endIndex);
    console.log('Products paginated:', this.products.length);
  }

  calculateTotalPages() {
    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    this.pageNumbers = Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  goToProductDetails(productId: number) {
    console.log('Attempting to navigate to product:', productId);
    this.router.navigate(['/shop/product', productId]).then(
        success => console.log('Navigation success:', success),
        error => console.error('Navigation error:', error)
    );
  }
}