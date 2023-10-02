import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowClothesModalComponent } from './show-clothes-modal.component';

describe('ShowClothesModalComponent', () => {
  let component: ShowClothesModalComponent;
  let fixture: ComponentFixture<ShowClothesModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowClothesModalComponent]
    });
    fixture = TestBed.createComponent(ShowClothesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
