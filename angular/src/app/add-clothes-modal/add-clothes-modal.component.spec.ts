import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddClothesModalComponent } from './add-clothes-modal.component';

describe('AddClothesModalComponent', () => {
  let component: AddClothesModalComponent;
  let fixture: ComponentFixture<AddClothesModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddClothesModalComponent]
    });
    fixture = TestBed.createComponent(AddClothesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
