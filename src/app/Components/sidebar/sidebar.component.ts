import {Component, OnInit} from '@angular/core';
import { ProductsService } from "../../service/Products/products.service";
import {Products, ProductsAll} from "../../../models/products";
import {CheckboxstateService} from "../../service/checkboxState/checkboxstate.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {
  categories: Array<Products> = [];
  sizes: Array<Products> = [];
  products: Array<ProductsAll> = [];
  isCheckedCategory: boolean[] = [];
  isCheckedSize: boolean[] = [];

  constructor(private ProductsService: ProductsService, private checkboxStateService: CheckboxstateService) {}

  ngOnInit() {
    this.categories = this.ProductsService.categories;
    this.sizes = this.ProductsService.sizes;
    this.products = this.ProductsService.products;

    // Initialize isCheckedCategory and isCheckedSize arrays
    this.isCheckedCategory = new Array(this.categories.length).fill(false);
    this.isCheckedSize = new Array(this.sizes.length).fill(false);

    this.checkboxStateService.updateCategoriesArray(this.categories);
    this.checkboxStateService.updateSizesArray(this.sizes);

    this.checkboxStateService.categoriesArray$.subscribe(categories => {
      this.categories = categories;
    });

    this.checkboxStateService.sizesArray$.subscribe(sizes => {
      this.sizes = sizes;
    });
  }

  startVal = 0;
  endVal = 1000;

  activateCheckboxCategory(event: any, index: number) {
    this.isCheckedCategory[index] = !this.isCheckedCategory[index];
    this.categories[index].state = this.isCheckedCategory[index];
    this.checkboxStateService.updateCategoriesArray(this.categories);
  }

  activateCheckboxSize(event: any, index: number) {
    this.isCheckedSize[index] = !this.isCheckedSize[index];
    this.sizes[index].state = this.isCheckedSize[index];
    this.checkboxStateService.updateSizesArray(this.sizes);
  }

  findCategory() {
    const selectedCategories = this.categories.filter(category => category.state).map(category => category.name);
    const selectedSizes = this.sizes.filter(size => size.state).map(size => size.name);

    if (selectedCategories.length && selectedSizes.length) {
      const sortedProducts = this.sortProducts(selectedCategories, selectedSizes);
      this.checkboxStateService.updateFilteredProducts(sortedProducts);
      console.log('Filtered and sorted Products:', sortedProducts);
      return;
    }

    if (selectedCategories.length && !selectedSizes.length) {
      const productsByCategory = this.ProductsService.findProductsByCategory(selectedCategories);
      this.checkboxStateService.updateFilteredProducts(productsByCategory);
      console.log('Products by category:', productsByCategory);
      return;
    }

    if (selectedSizes.length && !selectedCategories.length) {
      const productsBySize = this.ProductsService.findProductsBySize(selectedSizes);
      this.checkboxStateService.updateFilteredProducts(productsBySize);
      console.log('Products by size:', productsBySize);
      return;
    }

    console.log('Please select at least 1 category or 1 size.');
  }



  sortProducts(selectedCategories: string[], selectedSizes: string[]): ProductsAll[] {
    const filteredProducts: ProductsAll[] = [];
    selectedCategories.forEach(category => {
      selectedSizes.forEach(size => {
        const products = this.ProductsService.findProductsByCategoryAndSize([category], [size]);
        filteredProducts.push(...products);
      });
    });
    // Здесь вы можете добавить логику сортировки продуктов по вашему желанию
    return filteredProducts.sort((a, b) => a.price - b.price); // Пример сортировки по цене
  }

}


