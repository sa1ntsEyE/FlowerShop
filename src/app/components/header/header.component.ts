import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../service/Login/login.service';
import { CartService } from '../../service/cart/cart.service';
import { ProductsService } from '../../service/Products/products.service';
import { AuthService } from '../../service/auth.service';
import { ModalService } from '../../service/modal-shop-b-cart/modal.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  private loginService: LoginService = inject(LoginService);
  private cartService: CartService = inject(CartService);
  private productService: ProductsService = inject(ProductsService);
  private router: Router = inject(Router);
  private authService: AuthService = inject(AuthService);
  modalService = inject(ModalService);

  isCartVisible = false;
  showSearchModal: boolean = false;
  searchText: string = '';
  filteredObjects: any[] = [];
  placeholderText = '';
  fullText = "Пошук";
  user$ = this.authService.user$;
  addtoCart = this.cartService.addToCart;



  constructor() {}

  ngOnInit() {
    let i = 0;
    const interval = setInterval(() => {
      this.placeholderText = this.fullText.slice(0, i);
      i++;
      if (i > this.fullText.length) clearInterval(interval);
    }, 300);

    this.modalService.isVisible$.subscribe(visible => {
      this.isCartVisible = visible;
    });
  }

  toggleCartModal() {
    this.modalService.toggle();
  }


  onShopClick() {
    const variant = localStorage.getItem('cartVariant');
    if (variant === 'B') {
      this.modalService.hide();
    } else {
      this.modalService.show();
    }
  }


  goToProductDetails(productId: number) {
    console.log('Attempting to navigate to product:', productId);
    this.router.navigate(['/shop/product', productId]).then(
        success => console.log('Navigation success:', success),
        error => console.error('Navigation error:', error)
    );
    this.searchText = '';
    this.toggleSearchCartModal();
  }

  infoProductServiceFindSearch(event: Event) {
    const products = this.productService.products;
    const target = event.target as HTMLInputElement;
    const searchTerm = target.value.toLowerCase();
    this.showSearchModal = searchTerm !== '';
    this.filteredObjects = products.filter((product: any) =>
        product.name.toLowerCase().includes(searchTerm)
    );
  }

  toggleLoginComponent() {
    this.loginService.toggleLoginComponent();
  }

  checkLoginStatus() {
    return this.loginService.showLoginComponent;
  }

  get cartItems() {
    return this.cartService.getCartItems();
  }

  get cartItemsCount(): number {
    return this.cartService.getCartItems().length;
  }

  toggleSearchCartModal() {
    this.showSearchModal = !this.showSearchModal;
  }

  logOut() {
    this.authService.logout();
  }

}
