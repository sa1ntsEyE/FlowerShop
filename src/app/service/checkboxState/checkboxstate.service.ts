import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Products , ProductsAll} from '../../../models/products';

@Injectable({
  providedIn: 'root'
})
export class CheckboxstateService {
  private categoriesArray = new BehaviorSubject<Array<Products>>([]);
  private sizesArray = new BehaviorSubject<Array<Products>>([]);
  private filteredProductsSubject = new BehaviorSubject<ProductsAll[]>([]);

  categoriesArray$ = this.categoriesArray.asObservable();
  sizesArray$ = this.sizesArray.asObservable();
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
