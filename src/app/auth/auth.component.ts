import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { RootService } from '../shared/root.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {


  authForm: FormGroup;

  constructor(
    private rootService: RootService,
    public modalService: NgbModal,
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
  ) { }

  ngOnInit() {
    this.authForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.maxLength(15)]],
      password: ['', [Validators.required]],
    })
  }

  close() {
    this.activeModal.close('Close click');
    this.rootService.updatePizzaList.next('created');
  }
  onSubmit() {
    if (this.authForm.valid) {
      this.rootService.login(this.authForm.value).subscribe(response => {
        localStorage.setItem('auth', response['token'])
        if (localStorage.getItem('auth')) {
          this.activeModal.close('Close click');
          document.location.reload(true);
        }
      })
    }
  }

}
