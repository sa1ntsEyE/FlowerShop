import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReletedproductsComponent } from './reletedproducts.component';

describe('ReletedproductsComponent', () => {
  let component: ReletedproductsComponent;
  let fixture: ComponentFixture<ReletedproductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReletedproductsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReletedproductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
