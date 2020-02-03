import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { RootService } from '../../root.service';


@Component({
  selector: 'app-create-pizza-content',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']

})

export class ModalContentComponent implements OnInit {
  @Input() name;
  formCreatingPizza: FormGroup;
  public imagePath;
  url: any;

  onSelectFile(event) { // called each time file input changes
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      this.imagePath = event.target.files;
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event) => {
        console.log(event.target);
        this.url = reader.result;
        this.formCreatingPizza.controls['photo'].setValue(reader.result);
      };
    }
  }

  constructor(
    private rootService: RootService,
    public modalService: NgbModal,
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal) { }

  ngOnInit() {
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
    // this.formCreatingPizza.valueChanges.subscribe(res => {
    //   console.log(res);
    // });
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
    console.log(this.formCreatingPizza.value);

    // if (this.formCreatingPizza.valid) {
    //   this.create();
    // } else {
    //   this.validateAllFormFields(this.formCreatingPizza); //{7}
    // }
  }

  close() {
    this.activeModal.close('Close click');
    this.rootService.updatePizzaList.next('created');
  }

  create() {
    return this.rootService.createPizza(
      this.formCreatingPizza.value).subscribe(res => {
      console.log(res);
      this.activeModal.close('Close click');
    });

  }


}
