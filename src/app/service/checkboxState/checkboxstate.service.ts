import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Products , ProductsAll} from "../../../models/products";

@Injectable({
  providedIn: 'root'
})
export class CheckboxstateService {
  private categoriesArray = new BehaviorSubject<Array<Products>>([]);
  categoriesArray$ = this.categoriesArray.asObservable();

  private sizesArray = new BehaviorSubject<Array<Products>>([]);
  sizesArray$ = this.sizesArray.asObservable();

  private filteredProductsSubject = new BehaviorSubject<ProductsAll[]>([]);
  filteredProducts$ = this.filteredProductsSubject.asObservable();

  constructor() { }

  updateCategoriesArray(categories: Array<Products>) {
    this.categoriesArray.next(categories);
  }

  updateSizesArray(sizes: Array<Products>) {
    this.sizesArray.next(sizes);
  }

  updateFilteredProducts(products: ProductsAll[]) {
    this.filteredProductsSubject.next(products);
  }
}
