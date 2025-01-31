import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from "../../service/Products/products.service";
import { CommentsServiceService } from "../../service/CommentsService/comments-service.service";
import { AuthService } from "../../service/auth.service";
import { ProductsAll } from "../../../models/products";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  productId!: number;
  product: ProductsAll | null = null;
  comments: any[] = [];  // Массив для комментариев
  newComment: string = '';  // Новый комментарий
  user$ = this.authService.user$;
  selectedChoice: string = 'description'; // Добавлено для выбора между description и reviews
  rating: number = 0;  // Добавлено для рейтинга


  constructor(
      private route: ActivatedRoute,
      private productsService: ProductsService,
      private commentsService: CommentsServiceService,
      private authService: AuthService
  ) {}

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

  loadProductDetails() {
    this.productsService.getProductById(this.productId).subscribe(
        (product: ProductsAll) => {
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
          // Преобразуем timestamp в Date
          this.comments = comments.map(comment => ({
            ...comment,
            timestamp: comment.timestamp.toDate()  // Преобразуем Timestamp в Date
          }));
        },
        (error: any) => {
          console.error('Error loading comments:', error);
        }
    );
  }




  addComment(newComment: string): void {
    if (newComment.trim()) {
      this.user$.subscribe(user => {
        if (user && user.displayName) {  // Проверка наличия displayName
          this.commentsService.addComment(this.productId, newComment, user.displayName).then(() => {
            this.newComment = '';  // Очистить поле после отправки
            this.loadComments();  // Перезагрузить комментарии
          }).catch(error => console.error('Error adding comment:', error));
        } else {
          console.log('User not logged in or user has no displayName');
        }
      });
    }
  }


  addToCart(product: ProductsAll): void {
    // Здесь будет логика добавления товара в корзину
    console.log('Added to cart', product);
  }
}
