import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import {AngularFirestore} from '@angular/fire/compat/firestore';

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
    private firestore: AngularFirestore = inject(AngularFirestore);
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
  wishlistProductIds: Set<string> = new Set();
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
        this.loadWishlist();
      }
    });
  }

    loadWishlist() {
        this.user$.subscribe(user => {
            if (user) {
                // Правильное использование AngularFirestore
                this.firestore.collection('users').doc(user.uid).collection('wishlist')
                    .get()
                    .subscribe(snapshot => {
                        this.wishlistProductIds.clear();
                        snapshot.forEach((doc: any) => {
                            this.wishlistProductIds.add(doc.id);
                        });
                    });
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

  addToWishlist(product: ProductsAll, userId: string) {
      const wishlistRef = this.firestore.collection('users').doc(userId).collection('wishlist');

      wishlistRef.doc(product.id.toString()).set({
          id: product.id,
          name: product.name,
          price: product.price,
          img: product.img,
          description: product.description,
          createdAt: new Date()
      }).then(() => {
          console.log('Product added to wishlist!');
      }).catch(error => {
          console.error('Error adding to wishlist:', error);
      });
  }

    toggleWishlist(product: ProductsAll) {
        this.user$.subscribe(user => {
            if (user) {
                const wishlistRef = this.firestore
                    .collection('users')
                    .doc(user.uid)
                    .collection('wishlist')
                    .doc(product.id.toString());

                if (this.wishlistProductIds.has(product.id.toString())) {
                    wishlistRef.delete().then(() => {
                        this.wishlistProductIds.delete(product.id.toString());
                    });
                } else {
                    wishlistRef.set({
                        productId: product.id,
                        name: product.name,
                        img: product.img,
                        price: product.price
                    }).then(() => {
                        this.wishlistProductIds.add(product.id.toString());
                    });
                }
            }
        });
    }

    isInWishlist(productId: number): boolean {
        return this.wishlistProductIds.has(productId.toString());
    }

}
