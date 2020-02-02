import { Component, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { RootService } from '../shared/root.service';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'ngbd-modal-content',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']

})

export class NgbdModalContent {
  @Input() name;
  formCreatingPizza: FormGroup;

  constructor(
    private rootService: RootService,
    public modalService: NgbModal,
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal) { }

  ngOnInit() {
    this.formCreatingPizza = this.formBuilder.group({
      name: ["", [Validators.required, Validators.maxLength(15)]],
      category: ["", [Validators.required]],
      ingredients: [[], [Validators.required]],
      photo: ["", []],
      weight: this.formBuilder.group({
        small: ["", [Validators.required]],
        middle: ["", [Validators.required]],
        big: ["", [Validators.required]],
      }),
      price: this.formBuilder.group({
        low: ["", [Validators.required]],
        medium: ["", [Validators.required]],
        high: ["", [Validators.required]],
      }),
    });
  }


  validateAllFormFields(formDelivery: FormGroup) {
    Object.keys(formDelivery.controls).forEach(field => {
      const control = formDelivery.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }

    });
  }

  onSubmit() {
    if (this.formCreatingPizza.valid) {
      this.create();
    } else {
      this.validateAllFormFields(this.formCreatingPizza); //{7}
    }
  }

  create() {
    return this.rootService.createPizza(
      {
        name: this.formCreatingPizza.controls.name.value,
        category: this.formCreatingPizza.controls.category.value,
        ingredients: this.formCreatingPizza.controls.ingredients.value,
        photo: this.formCreatingPizza.controls.photo.value,
        weight: {
          small: this.formCreatingPizza.controls.weight['controls'].small.value,
          middle: this.formCreatingPizza.controls.weight['controls'].middle.value,
          big: this.formCreatingPizza.controls.weight['controls'].big.value,
        },
        price: {
          low: this.formCreatingPizza.controls.price['controls'].low.value,
          medium: this.formCreatingPizza.controls.price['controls'].medium.value,
          high: this.formCreatingPizza.controls.price['controls'].high.value,
        }
      }
    ).subscribe(res => {
      console.log(res);
      this.activeModal.close('Close click');
    });

  }


}
