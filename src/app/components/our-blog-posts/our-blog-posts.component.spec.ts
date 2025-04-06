import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OurBlogPostsComponent } from './our-blog-posts.component';

describe('OurBlogPostsComponent', () => {
  let component: OurBlogPostsComponent;
  let fixture: ComponentFixture<OurBlogPostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OurBlogPostsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OurBlogPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
