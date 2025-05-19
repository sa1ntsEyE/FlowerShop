import {Component, inject, OnInit} from '@angular/core';
import { ProductsService } from '../../service/Products/products.service';
import { Products, ProductsAll } from '../../../models/products';
import { CheckboxstateService } from '../../service/checkboxState/checkboxstate.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  private ProductsService: ProductsService = inject(ProductsService);
  private checkboxStateService: CheckboxstateService = inject(CheckboxstateService);
  categories: Array<Products> = [];
  sizes: Array<Products> = [];
  products: Array<ProductsAll> = [];
  isCheckedCategory: boolean[] = [];
  isCheckedSize: boolean[] = [];
  startVal = 0;
  endVal = 1000;

  constructor() {}

  async ngOnInit() {
    await this.ProductsService.updateCategoryCounters();
    await this.ProductsService.updateSizeCounters();
    await this.ProductsService.getProducts();

    this.categories = this.ProductsService.categories;
    this.sizes = this.ProductsService.sizes;
    this.products = this.ProductsService.products;

    this.isCheckedCategory = new Array(this.categories.length).fill(true);
    this.isCheckedSize = new Array(this.sizes.length).fill(true);
    this.checkboxStateService.updateCategoriesArray(this.categories);
    this.checkboxStateService.updateSizesArray(this.sizes);

    this.checkboxStateService.categoriesArray$.subscribe(categories => {
      this.categories = categories;
      this.findCategory();
    });

    this.checkboxStateService.sizesArray$.subscribe(sizes => {
      this.sizes = sizes;
      this.findCategory();
    });

    this.findCategory();
  }

  activateCheckboxCategory(event: any, index: number) {
    this.isCheckedCategory[index] = !this.isCheckedCategory[index];
    this.categories[index].state = this.isCheckedCategory[index];
    this.checkboxStateService.updateCategoriesArray(this.categories);
    this.findCategory();
  }

  activateCheckboxSize(event: any, index: number) {
    this.isCheckedSize[index] = !this.isCheckedSize[index];
    this.sizes[index].state = this.isCheckedSize[index];
    this.checkboxStateService.updateSizesArray(this.sizes);
    this.findCategory();
  }

  findCategory() {
    const selectedCategories = this.categories.filter(category => category.state).map(category => category.name);
    const selectedSizes = this.sizes.filter(size => size.state).map(size => size.name);
    let filteredProducts: ProductsAll[] = [];

    if (selectedCategories.length === 0) {
      filteredProducts = [];
    } else {
      if (selectedCategories.length && selectedSizes.length) {
        filteredProducts = this.sortProducts(selectedCategories, selectedSizes);
      } else if (selectedCategories.length) {
        filteredProducts = this.ProductsService.findProductsByCategory(selectedCategories);
      } else if (selectedSizes.length) {
        filteredProducts = this.ProductsService.findProductsBySize(selectedSizes);
      }
      filteredProducts = filteredProducts.filter(product =>
          product.price >= this.startVal && product.price <= this.endVal
      );
    }
    this.checkboxStateService.updateFilteredProducts(filteredProducts);
  }

  sortProducts(selectedCategories: string[], selectedSizes: string[]): ProductsAll[] {
    const filteredProducts: ProductsAll[] = [];
    selectedCategories.forEach(category => {
      selectedSizes.forEach(size => {
        const products = this.ProductsService.findProductsByCategoryAndSize(selectedCategories, selectedSizes);
        filteredProducts.push(...products);
      });
    });
    return filteredProducts.sort((a, b) => a.price - b.price);
  }
}
