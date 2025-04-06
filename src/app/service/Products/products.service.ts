import { Injectable , OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { Products, ProductsAll } from "../../../models/products";


import { Firestore, doc, getDoc, collection, getDocs } from '@angular/fire/firestore';

interface ProductSize {
  name: string;
  state: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  categories: Array<Products> = [];
  sizes: Array<Products> = [];
  products: Array<ProductsAll> = [];

  constructor(private http: HttpClient, private firestore: Firestore) {
    this.updateCategoryCounters();
    this.updateSizeCounters();
  }

  // Обновление счетчиков категорий
  async updateCategoryCounters(): Promise<void> {
    const categoriesCollection = collection(this.firestore, 'categories');
    const snapshot = await getDocs(categoriesCollection);
    this.categories = snapshot.docs.map(doc => doc.data() as Products);
  }

  // Обновление счетчиков размеров
  async updateSizeCounters(): Promise<void> {
    const sizesCollection = collection(this.firestore, 'sizes');
    const snapshot = await getDocs(sizesCollection);
    this.sizes = snapshot.docs.map(doc => doc.data() as Products);
  }

  // Получение всех продуктов
  async getProducts(): Promise<void> {
    const productsCollection = collection(this.firestore, 'products');
    const snapshot = await getDocs(productsCollection);
    this.products = snapshot.docs.map(doc => doc.data() as ProductsAll);
  }

  // Получение продукта по ID
  getProductById(productId: number): Observable<ProductsAll | null> {
    const productDoc = doc(this.firestore, 'products', productId.toString());
    return new Observable(observer => {
      getDoc(productDoc).then(docSnapshot => {
        if (docSnapshot.exists()) {
          observer.next(docSnapshot.data() as ProductsAll);
        } else {
          observer.next(null);
        }
        observer.complete();
      }).catch(error => {
        observer.error(error);
      });
    });
  }

  // Фильтрация продуктов по категории
  findProductsByCategory(categories: string[]): ProductsAll[] {
    return this.products.filter(product => categories.includes(product.categories));
  }


  // Фильтрация продуктов по размеру
  findProductsBySize(sizes: string[]): ProductsAll[] {
    return this.products.filter(product => sizes.includes(product.size.name));
  }


  // Фильтрация продуктов по категории и размеру
  findProductsByCategoryAndSize(categories: string[], sizes: string[]): ProductsAll[] {
    return this.products.filter(product =>
        categories.includes(product.categories) && sizes.includes(product.size.name)
    );
  }

}
