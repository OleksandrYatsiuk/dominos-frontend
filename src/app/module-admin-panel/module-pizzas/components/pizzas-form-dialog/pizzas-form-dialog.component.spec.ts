import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PizzasFormDialogComponent } from './pizzas-form-dialog.component';

describe('PizzasFormDialogComponent', () => {
  let component: PizzasFormDialogComponent;
  let fixture: ComponentFixture<PizzasFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PizzasFormDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PizzasFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
