import { Injectable } from '@angular/core';
import { Products, ProductsAll } from "../../../models/products";

interface ProductSize {
  name: string;
  state: boolean;
}

@Injectable({
  providedIn: 'root'
})

export class ProductsService {

  categories: Array<Products> = [
    { name: 'House Plants', counters: 33, state: true },
    { name: 'Potter Plants', counters: 12, state: true },
    { name: 'Seeds', counters: 65, state: true },
    { name: 'Small Plants', counters: 39, state: true },
    { name: 'Big Plants', counters: 23, state: true },
    { name: 'Succulents', counters: 17, state: true },
    { name: 'Terrariums', counters: 19, state: true },
    { name: 'Gardening', counters: 13, state: true },
    { name: 'Accessories', counters: 18, state: true }
  ];

  sizes: Array<Products> = [
    { name: 'Small', counters: 119, state: true },
    { name: 'Medium', counters: 86, state: true },
    { name: 'Large', counters: 78, state: true }
  ];

  products: Array<ProductsAll> = [
    {
      id: 1,
      categories: 'House Plants',
      size: { name: 'Small', state: true },
      name: 'Barberton Daisy',
      price: 120.00,
      grade: 4,
      img: 'assets/IconsProduct/product1.png'
    },
    {
      id: 2,
      categories: 'Big Plants',
      size: { name: 'Medium', state: true } as ProductSize,
      name: 'Angel Wing Begonia',
      price: 169.00,
      grade: 3,
      img: 'assets/IconsProduct/product2.png'
    },
    {
      id: 3,
      categories: 'Big Plants',
      size: { name: 'Large', state: true } as ProductSize,
      name: 'African Violet',
      price: 219.00,
      grade: 5,
      img: 'assets/IconsProduct/product3.png'
    },
    {
      id: 4,
      categories: 'House Plants',
      size: { name: 'Medium', state: true } as ProductSize,
      name: 'Beach Spider Lily',
      price: 129.00,
      grade: 5,
      img: 'assets/IconsProduct/product4.jpg'
    },
    {
      id: 5,
      categories: 'House Plants',
      size: { name: 'Medium', state: true } as ProductSize,
      name: 'Blushing Bromeliad',
      price: 139.00,
      grade: 5,
      img: 'assets/IconsProduct/product5.png'
    },
    {
      id: 6,
      categories: 'House Plants',
      size: { name: 'Large', state: true } as ProductSize,
      name: 'Aluminum Plant',
      price: 179.00,
      grade: 3,
      img: 'assets/IconsProduct/product6.png'
    },
    {
      id: 7,
      categories: 'Small Plants',
      size: { name: 'Large', state: true } as ProductSize,
      name: 'Bird\'s Nest Fern',
      price: 99.00,
      grade: 4,
      img: 'assets/IconsProduct/product7.png'
    },
    {
      id: 8,
      categories: 'Big Plants',
      size: { name: 'Small', state: true } as ProductSize,
      name: 'Broadleaf Lady Palm',
      price: 60.00,
      grade: 5,
      img: 'assets/IconsProduct/product8.png'
    },
    {
      id: 9,
      categories: 'House Plants',
      size: { name: 'Small', state: true } as ProductSize,
      name: 'Chinese Evergreen',
      price: 39.00,
      grade: 4,
      img: 'assets/IconsProduct/product9.png'
    },
    {
      id: 10,
      categories: 'House Plants',
      size: { name: 'Small', state: true } as ProductSize,
      name: 'Chinese Evergreen',
      price: 39.00,
      grade: 4,
      img: 'assets/IconsProduct/product9.png'
    }
  ];

  // Метод для обновления counters в категориях
  updateCategoryCounters() {
    this.categories.forEach(category => {
      // Подсчитываем количество товаров для каждой категории
      category.counters = this.products.filter(product => product.categories === category.name).length;
    });
  }

  // Метод для обновления counters в размерах
  updateSizeCounters() {
    this.sizes.forEach(size => {
      // Подсчитываем количество товаров для каждого размера
      size.counters = this.products.filter(product => product.size.name === size.name && product.size.state).length;
    });
  }

  // Вызываем методы обновления counters в конструкторе
  constructor() {
    this.updateCategoryCounters();
    this.updateSizeCounters();
  }

  findProductsByCategory(categories: string[]): ProductsAll[] {
    return this.products.filter(product =>
        categories.includes(product.categories)
    );
  }

  findProductsBySize(sizes: string[]): ProductsAll[] {
    return this.products.filter(product =>
        sizes.includes(product.size.name) &&
        product.size.state
    );
  }

  findProductsByCategoryAndSize(categories: string[], sizes: string[]): ProductsAll[] {
    return this.products.filter(product =>
        categories.includes(product.categories) &&
        sizes.includes(product.size.name) &&
        product.size.state
    );
  }
}
