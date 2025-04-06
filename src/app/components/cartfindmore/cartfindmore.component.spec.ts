import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartfindmoreComponent } from './cartfindmore.component';

describe('CartfindmoreComponent', () => {
  let component: CartfindmoreComponent;
  let fixture: ComponentFixture<CartfindmoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CartfindmoreComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CartfindmoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
