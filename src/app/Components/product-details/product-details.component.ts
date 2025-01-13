import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from "../../service/Products/products.service";
import { ProductsAll } from "../../../models/products";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  productId!: number;
  product: ProductsAll | null = null;

  constructor(
      private route: ActivatedRoute,
      private productsService: ProductsService
  ) {}

  ngOnInit() {
    console.log('ProductDetailsComponent initialized');
    this.route.paramMap.subscribe(params => {
      const productIdFromUrl = params.get('id');
      if (productIdFromUrl) {
        this.productId = +productIdFromUrl;
        this.loadProductDetails();
      } else {
        console.error('Product ID not found in URL');
      }
    });
  }

  loadProductDetails() {
    this.productsService.getProductById(this.productId).subscribe(
        (product: ProductsAll) => {
          this.product = product;
          console.log('Product loaded:', this.product);
        },
        (error) => {
          console.error('Error loading product:', error);
        }
    );
  }
}
