import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { RootService } from '../../shared/root.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {



  authForm: FormGroup;

  constructor(
    private rootService: RootService,
    public modalService: NgbModal,
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    private router: Router
  ) { }

  ngOnInit() {
    this.authForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.maxLength(15)]],
      password: ['', [Validators.required]],
    })
  }

  close() {
    this.activeModal.close('Close click');
  }
  onSubmit() {
    if (this.authForm.valid) {
      this.rootService.login(this.authForm.value).subscribe(response => {
        localStorage.setItem('auth', response['result']['token'])
        if (localStorage.getItem('auth')) {
          this.activeModal.close('Close click');
          this.router.navigate(['/']);
          setTimeout(() => {
            document.location.reload(true);
          }, 100);
        }
      })
    }
  }
  hasError(control: string, error: string): boolean {
    return this.authForm.controls[control].hasError(error);
  }

}
