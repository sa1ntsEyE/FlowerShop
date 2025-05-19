import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingCartBComponent } from './shopping-cart-b.component';

describe('ShoppingCartBComponent', () => {
  let component: ShoppingCartBComponent;
  let fixture: ComponentFixture<ShoppingCartBComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShoppingCartBComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShoppingCartBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
