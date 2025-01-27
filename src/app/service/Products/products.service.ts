import { Injectable } from '@angular/core';
import { Products, ProductsAll } from "../../../models/products";
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';

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
      description: 'The ceramic cylinder planters come with a wooden stand to help elevate your plants off the ground. ' +
          'The ceramic cylinder planters come with a wooden stand to help elevate your plants off the ground. ',
      productDescription: 'A modern decorative plant in a minimalist metal design. The black metal frame creates a ' +
          'stylish geometric accent, and inside there is a bowl with thick artificial green leaves, creating a ' +
          'natural effect. This accessory is suitable for adding freshness and brightness to the interior ' +
          'without the need for care.',
      livingRoom: 'In the living room, this decor can be placed on a shelf, coffee table or cabinet. Its modern and ' +
          'laconic design will perfectly complement the loft, minimalist or modern style, creating a contrast between ' +
          'the greenery and the strict lines of the metal frame.',
      diningRoom: 'On the dining table or sideboard, this plant will add a stylish accent and freshness. The compact' +
          ' size allows you to use it as a central element of decor or part of the composition, creating a cozy ' +
          'atmosphere.',
      office: 'In the office, this accessory will fit perfectly on a desk, shelf or windowsill, adding greenery and ' +
          'modernity to the space. Its strict design combines with a professional environment, while creating visual ' +
          'comfort and a sense of natural harmony.',
      img: 'assets/IconsProduct/product1.png'
    },
    {
      id: 2,
      categories: 'Big Plants',
      size: { name: 'Medium', state: true } as ProductSize,
      name: 'Angel Wing Begonia',
      price: 169.00,
      grade: 3,
      description: 'The ceramic cylinder planters come with a wooden stand to help elevate your plants off the ground. ' +
          'The ceramic cylinder planters come with a wooden stand to help elevate your plants off the ground. ',
      productDescription: 'This stylish plant pot features a minimalist design, combining a matte white top with a ' +
          'textured grey concrete base. It houses an artificial plant with large green leaves, imitating a monstera. ' +
          'The pot is perfect for decorating your interior and creating a fresh, modern accent without the need for ' +
          'maintenance.',
      livingRoom: 'In the living room, this pot will add a bright green accent on a coffee table, shelf or in the corner' +
          ' of the room. Its modern design fits perfectly with minimalist, Scandinavian or eco-themes, giving the space' +
          ' a cozy and lively feel.',
      diningRoom: 'In the dining area, this pot can become an elegant decorative element on a sideboard, windowsill or ' +
          'even in the center of the dining table. Greenery and simple design create a relaxing atmosphere that is well ' +
          'suited for family and friendly gatherings.',
      office: 'For the office, this plant will become a source of visual calm and help create a comfortable workspace.' +
          ' The pot can be placed on a desk, shelf or in the corner of the office to add greenery and modern style ' +
          'to the interior.',
      img: 'assets/IconsProduct/product2.png'
    },
    {
      id: 3,
      categories: 'Big Plants',
      size: { name: 'Large', state: true } as ProductSize,
      name: 'African Violet',
      price: 219.00,
      grade: 5,
      description: 'The ceramic cylinder planters come with a wooden stand to help elevate your plants off the ground. ' +
          'The ceramic cylinder planters come with a wooden stand to help elevate your plants off the ground. ',
      productDescription: 'A modern decorative plant in a minimalist metal design. The black metal frame creates a stylish ' +
          'geometric accent, and inside there is a bowl with thick artificial green leaves, creating a natural effect. ' +
          'This accessory is suitable for adding freshness and brightness to the interior without the need for care.',
      livingRoom: 'In the living room, this decor can be placed on a shelf, coffee table or cabinet. Its modern and ' +
          'laconic design will perfectly complement the loft, minimalist or modern style, creating a contrast between ' +
          'the greenery and the strict lines of the metal frame.',
      diningRoom: 'On the dining table or sideboard, this plant will add a stylish accent and freshness. The compact ' +
          'size allows you to use it as a central element of decor or part of the composition, creating a cozy atmosphere.',
      office: 'In the office, this accessory will fit perfectly on a desk, shelf or windowsill, adding greenery ' +
          'and modernity to the space. Its strict design combines with a professional environment, while creating ' +
          'visual comfort and a sense of natural harmony.',
      img: 'assets/IconsProduct/product3.png'
    },
    {
      id: 4,
      categories: 'House Plants',
      size: { name: 'Medium', state: true } as ProductSize,
      name: 'Beach Spider Lily',
      price: 129.00,
      grade: 5,
      description: 'The ceramic cylinder planters come with a wooden stand to help elevate your plants off the ground. ' +
          'The ceramic cylinder planters come with a wooden stand to help elevate your plants off the ground. ',
      productDescription: 'This stylish plant pot features a minimalist design, combining a matte white top with a ' +
          'textured grey concrete base. It houses an artificial plant with large green leaves, imitating a monstera. ' +
          'The pot is perfect for decorating your interior and creating a fresh, modern accent without the need for ' +
          'maintenance.',
      livingRoom: 'In the living room, this pot will add a bright green accent on a coffee table, shelf or in the corner' +
          ' of the room. Its modern design fits perfectly with minimalist, Scandinavian or eco-themes, giving the space' +
          ' a cozy and lively feel.',
      diningRoom: 'In the dining area, this pot can become an elegant decorative element on a sideboard, windowsill or ' +
          'even in the center of the dining table. Greenery and simple design create a relaxing atmosphere that is well ' +
          'suited for family and friendly gatherings.',
      office: 'For the office, this plant will become a source of visual calm and help create a comfortable workspace.' +
          ' The pot can be placed on a desk, shelf or in the corner of the office to add greenery and modern style ' +
          'to the interior.',
      img: 'assets/IconsProduct/product4.png'
    },
    {
      id: 5,
      categories: 'House Plants',
      size: { name: 'Medium', state: true } as ProductSize,
      name: 'Blushing Bromeliad',
      price: 139.00,
      grade: 5,
      description: 'The ceramic cylinder planters come with a wooden stand to help elevate your plants off the ground. ' +
          'The ceramic cylinder planters come with a wooden stand to help elevate your plants off the ground. ',
      productDescription: 'This stylish plant pot features a minimalist design, combining a matte white top with a ' +
          'textured grey concrete base. It houses an artificial plant with large green leaves, imitating a monstera. ' +
          'The pot is perfect for decorating your interior and creating a fresh, modern accent without the need for ' +
          'maintenance.',
      livingRoom: 'In the living room, this pot will add a bright green accent on a coffee table, shelf or in the corner' +
          ' of the room. Its modern design fits perfectly with minimalist, Scandinavian or eco-themes, giving the space' +
          ' a cozy and lively feel.',
      diningRoom: 'In the dining area, this pot can become an elegant decorative element on a sideboard, windowsill or ' +
          'even in the center of the dining table. Greenery and simple design create a relaxing atmosphere that is well ' +
          'suited for family and friendly gatherings.',
      office: 'For the office, this plant will become a source of visual calm and help create a comfortable workspace.' +
          ' The pot can be placed on a desk, shelf or in the corner of the office to add greenery and modern style ' +
          'to the interior.',
      img: 'assets/IconsProduct/product5.png'
    },
    {
      id: 6,
      categories: 'House Plants',
      size: { name: 'Large', state: true } as ProductSize,
      name: 'Aluminum Plant',
      price: 179.00,
      grade: 3,
      description: 'The ceramic cylinder planters come with a wooden stand to help elevate your plants off the ground. ' +
          'The ceramic cylinder planters come with a wooden stand to help elevate your plants off the ground. ',
      productDescription: 'This stylish plant pot features a minimalist design, combining a matte white top with a ' +
          'textured grey concrete base. It houses an artificial plant with large green leaves, imitating a monstera. ' +
          'The pot is perfect for decorating your interior and creating a fresh, modern accent without the need for ' +
          'maintenance.',
      livingRoom: 'In the living room, this pot will add a bright green accent on a coffee table, shelf or in the corner' +
          ' of the room. Its modern design fits perfectly with minimalist, Scandinavian or eco-themes, giving the space' +
          ' a cozy and lively feel.',
      diningRoom: 'In the dining area, this pot can become an elegant decorative element on a sideboard, windowsill or ' +
          'even in the center of the dining table. Greenery and simple design create a relaxing atmosphere that is well ' +
          'suited for family and friendly gatherings.',
      office: 'For the office, this plant will become a source of visual calm and help create a comfortable workspace.' +
          ' The pot can be placed on a desk, shelf or in the corner of the office to add greenery and modern style ' +
          'to the interior.',
      img: 'assets/IconsProduct/product6.png'
    },
    {
      id: 7,
      categories: 'Small Plants',
      size: { name: 'Large', state: true } as ProductSize,
      name: 'Bird\'s Nest Fern',
      price: 99.00,
      grade: 4,
      description: 'The ceramic cylinder planters come with a wooden stand to help elevate your plants off the ground. ' +
          'The ceramic cylinder planters come with a wooden stand to help elevate your plants off the ground. ',
      productDescription: 'A modern decorative plant in a minimalist metal design. The black metal frame creates a stylish ' +
          'geometric accent, and inside there is a bowl with thick artificial green leaves, creating a natural effect. ' +
          'This accessory is suitable for adding freshness and brightness to the interior without the need for care.',
      livingRoom: 'In the living room, this decor can be placed on a shelf, coffee table or cabinet. Its modern and ' +
          'laconic design will perfectly complement the loft, minimalist or modern style, creating a contrast between ' +
          'the greenery and the strict lines of the metal frame.',
      diningRoom: 'On the dining table or sideboard, this plant will add a stylish accent and freshness. The compact ' +
          'size allows you to use it as a central element of decor or part of the composition, creating a cozy atmosphere.',
      office: 'In the office, this accessory will fit perfectly on a desk, shelf or windowsill, adding greenery ' +
          'and modernity to the space. Its strict design combines with a professional environment, while creating ' +
          'visual comfort and a sense of natural harmony.',
      img: 'assets/IconsProduct/product7.png'
    },
    {
      id: 8,
      categories: 'Big Plants',
      size: { name: 'Small', state: true } as ProductSize,
      name: 'Broadleaf Lady Palm',
      price: 60.00,
      grade: 5,
      description: 'The ceramic cylinder planters come with a wooden stand to help elevate your plants off the ground. ' +
          'The ceramic cylinder planters come with a wooden stand to help elevate your plants off the ground. ',
      productDescription: 'A modern decorative plant in a minimalist metal design. The black metal frame creates a ' +
          'stylish geometric accent, and inside there is a bowl with thick artificial green leaves, creating a ' +
          'natural effect. This accessory is suitable for adding freshness and brightness to the interior ' +
          'without the need for care.',
      livingRoom: 'In the living room, this decor can be placed on a shelf, coffee table or cabinet. Its modern and ' +
          'laconic design will perfectly complement the loft, minimalist or modern style, creating a contrast between ' +
          'the greenery and the strict lines of the metal frame.',
      diningRoom: 'On the dining table or sideboard, this plant will add a stylish accent and freshness. The compact' +
          ' size allows you to use it as a central element of decor or part of the composition, creating a cozy ' +
          'atmosphere.',
      office: 'In the office, this accessory will fit perfectly on a desk, shelf or windowsill, adding greenery and ' +
          'modernity to the space. Its strict design combines with a professional environment, while creating visual ' +
          'comfort and a sense of natural harmony.',
      img: 'assets/IconsProduct/product8.png'
    },
    {
      id: 9,
      categories: 'House Plants',
      size: { name: 'Small', state: true } as ProductSize,
      name: 'Chinese Evergreen',
      price: 39.00,
      grade: 4,
      description: 'The ceramic cylinder planters come with a wooden stand to help elevate your plants off the ground. ' +
          'The ceramic cylinder planters come with a wooden stand to help elevate your plants off the ground. ',
      productDescription: 'A modern decorative plant in a minimalist metal design. The black metal frame creates a ' +
          'stylish geometric accent, and inside there is a bowl with thick artificial green leaves, creating a ' +
          'natural effect. This accessory is suitable for adding freshness and brightness to the interior ' +
          'without the need for care.',
      livingRoom: 'In the living room, this decor can be placed on a shelf, coffee table or cabinet. Its modern and ' +
          'laconic design will perfectly complement the loft, minimalist or modern style, creating a contrast between ' +
          'the greenery and the strict lines of the metal frame.',
      diningRoom: 'On the dining table or sideboard, this plant will add a stylish accent and freshness. The compact' +
          ' size allows you to use it as a central element of decor or part of the composition, creating a cozy ' +
          'atmosphere.',
      office: 'In the office, this accessory will fit perfectly on a desk, shelf or windowsill, adding greenery and ' +
          'modernity to the space. Its strict design combines with a professional environment, while creating visual ' +
          'comfort and a sense of natural harmony.',
      img: 'assets/IconsProduct/product9.png'
    },
    {
      id: 10,
      categories: 'House Plants',
      size: { name: 'Small', state: true } as ProductSize,
      name: 'Chinese Evergreen',
      price: 39.00,
      grade: 4,
      description: 'The ceramic cylinder planters come with a wooden stand to help elevate your plants off the ground. ' +
          'The ceramic cylinder planters come with a wooden stand to help elevate your plants off the ground. ',
      productDescription: 'A modern decorative plant in a minimalist metal design. The black metal frame creates a ' +
          'stylish geometric accent, and inside there is a bowl with thick artificial green leaves, creating a ' +
          'natural effect. This accessory is suitable for adding freshness and brightness to the interior ' +
          'without the need for care.',
      livingRoom: 'In the living room, this decor can be placed on a shelf, coffee table or cabinet. Its modern and ' +
          'laconic design will perfectly complement the loft, minimalist or modern style, creating a contrast between ' +
          'the greenery and the strict lines of the metal frame.',
      diningRoom: 'On the dining table or sideboard, this plant will add a stylish accent and freshness. The compact' +
          ' size allows you to use it as a central element of decor or part of the composition, creating a cozy ' +
          'atmosphere.',
      office: 'In the office, this accessory will fit perfectly on a desk, shelf or windowsill, adding greenery and ' +
          'modernity to the space. Its strict design combines with a professional environment, while creating visual ' +
          'comfort and a sense of natural harmony.',
      img: 'assets/IconsProduct/product9.png'
    }
  ];

  constructor(private http: HttpClient) {
    this.updateCategoryCounters();
    this.updateSizeCounters();
  }

  // Обновление счетчиков категорий
  updateCategoryCounters(): void {
    this.categories.forEach(category => {
      category.counters = this.products.filter(product => product.categories === category.name).length;
    });
  }

  // Обновление счетчиков размеров
  updateSizeCounters(): void {
    this.sizes.forEach(size => {
      size.counters = this.products.filter(product => product.size.name === size.name && product.size.state).length;
    });
  }

  // Поиск продуктов по категориям
  findProductsByCategory(categories: string[]): ProductsAll[] {
    return this.products.filter(product => categories.includes(product.categories));
  }

  // Поиск продуктов по размерам
  findProductsBySize(sizes: string[]): ProductsAll[] {
    return this.products.filter(product => sizes.includes(product.size.name) && product.size.state);
  }

  // Поиск продуктов по категориям и размерам
  findProductsByCategoryAndSize(categories: string[], sizes: string[]): ProductsAll[] {
    return this.products.filter(
        product =>
            categories.includes(product.categories) &&
            sizes.includes(product.size.name) &&
            product.size.state
    );
  }

  // Получение продукта по ID
  getProductById(id: number): Observable<ProductsAll> {
    console.log(`Fetching product with ID: ${id}`);
    const product = this.products.find(p => p.id === id);
    if (product) {
      return of(product);
    } else {
      console.error(`Product with ID ${id} not found`);
      return throwError(() => new Error('Product not found'));
    }
  }
}