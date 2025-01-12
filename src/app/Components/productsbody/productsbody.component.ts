import { Component, OnInit } from '@angular/core';
import { ProductsService } from "../../service/Products/products.service";
import { ProductsAll } from "../../../models/products";
import { CheckboxstateService } from "../../service/checkboxState/checkboxstate.service";

@Component({
  selector: 'app-productsbody',
  templateUrl: './productsbody.component.html',
  styleUrl: './productsbody.component.scss'
})
export class ProductsbodyComponent implements OnInit {
  products: Array<ProductsAll> = [];
  filteredProducts: Array<ProductsAll> = [];  // Отфильтрованные товары
  currentPage: number = 1;  // Текущая страница
  itemsPerPage: number = 9;  // Количество товаров на странице
  totalItems: number = 0;  // Общее количество товаров
  totalPages: number = 0;  // Общее количество страниц
  pageNumbers: number[] = [];  // Массив для номеров страниц

  constructor(private productsService: ProductsService, private checkboxService: CheckboxstateService) {}

  ngOnInit() {
    // Подписываемся на обновления отфильтрованных товаров
    this.checkboxService.filteredProducts$.subscribe(products => {
      this.filteredProducts = products;
      this.totalItems = products.length;  // Обновляем общее количество товаров
      this.calculateTotalPages();  // Пересчитываем количество страниц
      this.paginateProducts();  // Применяем пагинацию сразу после получения данных
    });
  }

  // Метод для переключения страницы
  setPage(page: number) {
    if (page < 1 || page > this.totalPages) return;  // Проверяем допустимость страницы
    this.currentPage = page;
    this.paginateProducts();  // Применяем пагинацию после смены страницы
  }

  // Пагинация товаров
  paginateProducts() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;

    // Обновляем отображаемые товары с учетом текущей страницы
    const paginatedProducts = this.filteredProducts.slice(startIndex, endIndex);
    this.products = paginatedProducts;  // Обновляем список товаров для отображения
  }

  // Пересчитываем количество страниц и генерируем массив с номерами страниц
  calculateTotalPages() {
    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    this.pageNumbers = Array.from({ length: this.totalPages }, (_, i) => i + 1);  // Генерируем массив с номерами страниц
  }
}
