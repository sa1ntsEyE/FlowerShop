import { Component, OnInit, inject, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductsAll } from '../../../models/products';
import { CheckboxstateService } from '../../service/checkboxState/checkboxstate.service';
import { CartService } from '../../service/cart/cart.service';

@Component({
  selector: 'app-productsbody',
  templateUrl: './productsbody.component.html',
  styleUrls: ['./productsbody.component.scss']
})
export class ProductsbodyComponent implements OnInit, OnDestroy {
  private checkboxService: CheckboxstateService = inject(CheckboxstateService);
  private router: Router = inject(Router);
  private cartService: CartService = inject(CartService);
  private watcherFilteredProduct!: Subscription;

  products: Array<ProductsAll> = [];
  filteredProducts: ProductsAll[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 9;
  totalItems: number = 0;
  totalPages: number = 0;
  pageNumbers: number[] = [];

  constructor() {}

  ngOnInit() {
    this.watcherFilteredProduct = this.checkboxService
        .filteredProducts$
        .subscribe(products => {
          this.filteredProducts = this.removeDuplicates(products);
          this.totalItems = this.filteredProducts.length;
          this.calculateTotalPages();
          this.paginateProducts();
        });
  }

  ngOnDestroy() {
    this.watcherFilteredProduct?.unsubscribe();
  }

  addToCart(product: any) {
    this.cartService.addToCart(product);
  }

  setPage(page: number) {
    if (page < 1 || page > this.totalPages) return;

    this.currentPage = page;
    this.paginateProducts();
  }

  paginateProducts() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    // Используем уникальные товары в пагинации
    this.products = this.filteredProducts.slice(startIndex, endIndex);
  }

  calculateTotalPages() {
    this.totalPages = Math.ceil(this.filteredProducts.length / this.itemsPerPage);
    this.pageNumbers = Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  goToProductDetails(productId: number) {
    this.router.navigate(['/shop/product', productId]);
  }

  // Убираем дубликаты по ID
  removeDuplicates(products: ProductsAll[]): ProductsAll[] {
    const seen = new Set();
    return products.filter(product => {
      if (seen.has(product.id)) {
        return false;
      } else {
        seen.add(product.id);
        return true;
      }
    });
  }
}
