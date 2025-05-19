import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomCartComponent } from './random-cart.component';

describe('RandomCartComponent', () => {
  let component: RandomCartComponent;
  let fixture: ComponentFixture<RandomCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RandomCartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RandomCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
