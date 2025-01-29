import { Component } from '@angular/core';
import {LoginService} from "../../service/Login/login.service";
import { CartService } from "../../service/cart/cart.service";
import { ProductsService } from "../../service/Products/products.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  showSearchModal:boolean = false;
  searchText: string = '';
  showLoginComponent = false;
  filteredObjects: any[] = [];

  constructor(
      private loginService : LoginService,
      private cartService: CartService,
      private productService: ProductsService,
      private router: Router,
  ) {}

  addtoCart = this.cartService.addToCart;

  goToProductDetails(productId: number) {
    console.log('Attempting to navigate to product:', productId);
    this.router.navigate(['/shop/product', productId]).then(
        success => console.log('Navigation success:', success),
        error => console.error('Navigation error:', error)
    );
    this.searchText = '';
    this.toggleSearchCartModal()
  }

  infoProductServiceFindSearch(event: Event) {
    const products = this.productService.products;
    const target = event.target as HTMLInputElement;
    const searchTerm = target.value.toLowerCase();
    console.log(products, "infoProductServiceFindSearch");
    console.log(target.value);
    this.showSearchModal = searchTerm !== '';
    this.filteredObjects = products.filter((product: any) =>
        product.name.toLowerCase().includes(searchTerm)
    );
  }

  get cartItemsCount(): number {
    return this.cartService.getCartItems().length;
  }

  toggleLoginComponent() {
    this.loginService.toggleLoginComponent()
  }

  checkLoginStatus() {
    return this.loginService.showLoginComponent;
  }

  showCartModal = false;

  get cartItems() {
    return this.cartService.getCartItems();
  }

  get cartTotal() {
    return this.cartService.getTotalAmount();
  }

  toggleCartModal() {
    this.showCartModal = !this.showCartModal;
  }

  toggleSearchCartModal() {
    this.showSearchModal = !this.showSearchModal;
  }

  incrementQuantity(productId: number) {
    const item = this.cartItems.find(item => item.id === productId);
    if (item) {
      this.cartService.updateQuantity(productId, item.quantity + 1);
    }
  }

  decrementQuantity(productId: number) {
    const item = this.cartItems.find(item => item.id === productId);
    if (item) {
      this.cartService.updateQuantity(productId, item.quantity - 1);
    }
  }

  removeFromCart(productId: number) {
    this.cartService.removeFromCart(productId);
  }
}
