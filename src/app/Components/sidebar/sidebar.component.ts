import { Component, OnInit } from '@angular/core';
import { ProductsService } from "../../service/Products/products.service";
import { Products, ProductsAll } from "../../../models/products";
import { CheckboxstateService } from "../../service/checkboxState/checkboxstate.service";

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

    // Initialize isCheckedCategory and isCheckedSize arrays to true, so all checkboxes are checked by default
    this.isCheckedCategory = new Array(this.categories.length).fill(true);
    this.isCheckedSize = new Array(this.sizes.length).fill(true);

    this.checkboxStateService.updateCategoriesArray(this.categories);
    this.checkboxStateService.updateSizesArray(this.sizes);

    // Subscribe to categories and sizes array changes
    this.checkboxStateService.categoriesArray$.subscribe(categories => {
      this.categories = categories;
      this.findCategory();  // Re-run filtering when categories are updated
    });

    this.checkboxStateService.sizesArray$.subscribe(sizes => {
      this.sizes = sizes;
      this.findCategory();  // Re-run filtering when sizes are updated
    });

    // Run findCategory to apply initial filtering on load
    this.findCategory();
  }

  startVal = 0;
  endVal = 1000;

  activateCheckboxCategory(event: any, index: number) {
    this.isCheckedCategory[index] = !this.isCheckedCategory[index];
    this.categories[index].state = this.isCheckedCategory[index];
    this.checkboxStateService.updateCategoriesArray(this.categories);
    this.findCategory(); // Re-filter products immediately after category change
  }

  activateCheckboxSize(event: any, index: number) {
    this.isCheckedSize[index] = !this.isCheckedSize[index];
    this.sizes[index].state = this.isCheckedSize[index];
    this.checkboxStateService.updateSizesArray(this.sizes);
    this.findCategory(); // Re-filter products immediately after size change
  }


  findCategory() {
    // Get the selected categories and sizes (where state is true)
    const selectedCategories = this.categories.filter(category => category.state).map(category => category.name);
    const selectedSizes = this.sizes.filter(size => size.state).map(size => size.name);

    let filteredProducts: ProductsAll[] = [];

    // If there are no selected categories or sizes, do not show any products
    if (selectedCategories.length === 0 ) {
      filteredProducts = []; // No products are displayed if no filters are applied
    } else {
      // Filter by category and size
      if (selectedCategories.length && selectedSizes.length) {
        filteredProducts = this.sortProducts(selectedCategories, selectedSizes);
      } else if (selectedCategories.length) {
        filteredProducts = this.ProductsService.findProductsByCategory(selectedCategories);
      } else if (selectedSizes.length) {
        filteredProducts = this.ProductsService.findProductsBySize(selectedSizes);
      }

      // Filter by price
      filteredProducts = filteredProducts.filter(product =>
          product.price >= this.startVal && product.price <= this.endVal
      );
    }

    // Update the filtered products in the service
    this.checkboxStateService.updateFilteredProducts(filteredProducts);
    // console.log('Filtered Products:', filteredProducts);
  }


  sortProducts(selectedCategories: string[], selectedSizes: string[]): ProductsAll[] {
    const filteredProducts: ProductsAll[] = [];
    selectedCategories.forEach(category => {
      selectedSizes.forEach(size => {
        const products = this.ProductsService.findProductsByCategoryAndSize([category], [size]);
        filteredProducts.push(...products);
      });
    });
    // Сортировка товаров по цене
    return filteredProducts.sort((a, b) => a.price - b.price);
  }
}
