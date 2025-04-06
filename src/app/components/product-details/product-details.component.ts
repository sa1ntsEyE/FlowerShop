import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import {Subscription} from "rxjs";

import { ProductsService } from '../../service/Products/products.service';
import { CommentsServiceService } from '../../service/CommentsService/comments-service.service';
import { AuthService } from '../../service/auth.service';
import { ProductsAll } from '../../../models/products';
import { CartService } from '../../service/cart/cart.service';
import {NgbRatingConfig} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})

export class ProductDetailsComponent implements OnInit, OnDestroy {
    private route: ActivatedRoute = inject(ActivatedRoute);
    private productsService: ProductsService = inject(ProductsService);
    private commentsService: CommentsServiceService = inject(CommentsServiceService);
    private cartService: CartService = inject(CartService);
    private authService: AuthService = inject(AuthService);
  productId!: number;
  product: ProductsAll | null = null;
  comments: any[] = [];
  newComment: string = '';
  user$ = this.authService.user$;
  newRating: number = 0;
  selectedChoice: string = 'description';

  // private watcherLoadProductDetails!: Subscription;
  // private watcherLoadComments!: Subscription;

  constructor(config : NgbRatingConfig) {
    config.max = 5;
    config.readonly = false;
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const productIdFromUrl = params.get('id');
      if (productIdFromUrl) {
        this.productId = +productIdFromUrl;
        this.loadProductDetails();
        this.loadComments();
      }
    });
  }

  ngOnDestroy() {}

    loadProductDetails() {
        this.productsService.getProductById(this.productId).subscribe(
            (product: ProductsAll | null) => {
                this.product = product;
            },
            (error) => {
                console.error('Error loading product:', error);
            }
        );
    }


    loadComments() {
   this.commentsService.getComments(this.productId).subscribe(
        (comments: any[]) => {
          this.comments = comments.map(comment => ({
            ...comment,
            timestamp: comment.timestamp.toDate()
          }));
          this.updateProductRating();
        },
        (error: any) => {
          console.error('Error loading comments:', error);
        }
    );
  }

  addComment(newComment: string, newRating: number): void {
    if (newComment.trim()) {
      this.user$.subscribe(user => {
        if (user && user.displayName) {
          this.commentsService.addComment(this.productId, newComment, user.displayName, newRating)
              .then(() => {
                this.comments.push({
                  comment: newComment,
                  userName: user.displayName,
                  rating: newRating,
                  timestamp: new Date()
                });
                this.newComment = '';
                this.newRating = 0;
                this.updateProductRating();
              })
              .catch(error => console.error('Error adding comment:', error));
        } else {
          console.log('User not logged in or user has no displayName');
        }
      });
    }
  }

  updateProductRating() {
    if (this.product && this.comments.length > 0) {
      const total = this.comments.reduce((sum, comment) => sum + comment.rating, 0);
      this.product.grade = total / this.comments.length;
    } else if (this.product) {
      this.product.grade = 0;
    }
  }

  addToCart(product: ProductsAll): void {
    this.cartService.addToCart(product);
  }

}
