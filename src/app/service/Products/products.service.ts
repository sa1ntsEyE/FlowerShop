import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Products, ProductsAll } from "../../../models/products";

import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  categories: Array<Products> = [];
  sizes: Array<Products> = [];
  products: Array<ProductsAll> = [];

  constructor(private http: HttpClient, private firestore: AngularFirestore) {
    this.updateCategoryCounters();
    this.updateSizeCounters();
  }

  async updateCategoryCounters(): Promise<void> {
    const snapshot = await this.firestore.collection<Products>('categories').get().toPromise();
    this.categories = snapshot?.docs.map(doc => doc.data()) || [];
  }

  async updateSizeCounters(): Promise<void> {
    const snapshot = await this.firestore.collection<Products>('sizes').get().toPromise();
    this.sizes = snapshot?.docs.map(doc => doc.data()) || [];
  }

  async getProducts(): Promise<void> {
    const snapshot = await this.firestore.collection<ProductsAll>('products').get().toPromise();
    this.products = snapshot?.docs.map(doc => doc.data()) || [];
  }

  getProductById(productId: number): Observable<ProductsAll | null> {
    return this.firestore.doc<ProductsAll>(`products/${productId}`).get().pipe(
        map(snapshot => snapshot.exists ? snapshot.data()! : null)
    );
  }

  findProductsByCategory(categories: string[]): ProductsAll[] {
    return this.products.filter(product => categories.includes(product.categories));
  }

  findProductsBySize(sizes: string[]): ProductsAll[] {
    return this.products.filter(product => sizes.includes(product.size.name));
  }

  findProductsByCategoryAndSize(categories: string[], sizes: string[]): ProductsAll[] {
    return this.products.filter(product =>
        categories.includes(product.categories) && sizes.includes(product.size.name)
    );
  }
}
