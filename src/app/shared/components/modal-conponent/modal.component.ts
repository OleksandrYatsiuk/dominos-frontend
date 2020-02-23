import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { RootService } from '../../root.service';
import { Ingredients } from '../../models/pizza.interface';

@Component({
  selector: 'app-create-pizza-content',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})

export class ModalContentComponent implements OnInit {

  @Input() name;

  ingredients: Ingredients[];


  selectConfig = {
    search: true,
    placeholder: 'Select category',
    displayKey: "name"
  }

  config = {
    search: true,
    placeholder: 'Select ingredients',
    limitTo: 5,
    moreText: "інших",
    displayKey: "name"
  }

  categories = ["Краща ціна", "Класичні", "Фірмові"]

  formCreatingPizza: FormGroup;

  constructor(
    private rootService: RootService,
    public modalService: NgbModal,
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit() {

    this.rootService.getIngredientsList().subscribe(res => {
      this.ingredients = res['result'];
    });

    this.formCreatingPizza = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(15)]],
      category: ['', [Validators.required]],
      ingredients: [[], [Validators.required]],
      photo: ['', []],
      weight: this.formBuilder.group({
        small: ['', [Validators.required]],
        middle: ['', [Validators.required]],
        big: ['', [Validators.required]],
      }),
      price: this.formBuilder.group({
        low: ['', [Validators.required]],
        medium: ['', [Validators.required]],
        high: ['', [Validators.required]],
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
    return this.rootService.createPizza(this.formCreatingPizza.value).subscribe(response => {
      if (response.code === 201) {
        console.log("Pizza was created succesfully!");
        this.activeModal.close('Close click');
      } else {
        console.log("You get error!");
      }
    });
  }

  close() {
    this.activeModal.close('Close click');
    this.rootService.updatePizzaList.next('created');
  }
}
