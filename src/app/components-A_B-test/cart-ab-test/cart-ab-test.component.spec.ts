import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartAbTestComponent } from './cart-ab-test.component';

describe('CartAbTestComponent', () => {
  let component: CartAbTestComponent;
  let fixture: ComponentFixture<CartAbTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CartAbTestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CartAbTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
