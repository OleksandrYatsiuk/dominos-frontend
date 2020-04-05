import { Component, OnInit, ErrorHandler } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { UserService } from 'src/app/core/services/user.service';
import { ValidationMessages } from '../../core/models/error-list';
import { ErrorHeadlerService } from 'src/app/core/services/errorHeadler.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  authForm: FormGroup;
  public spinLogIn = false;
  public validations = ValidationMessages;

  get username() { return this.authForm.get('username') };
  get password() { return this.authForm.get('password') };

  constructor(
    private http: AuthService,
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    private router: Router,
    private user: UserService,
    private headler: ErrorHeadlerService
  ) { }

  ngOnInit() {
    this.authForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    })
  }

  close() {
    this.activeModal.close();
  }
  onSubmit() {
    if (this.authForm.valid) {
      this.spinLogIn = !this.spinLogIn;
      this.http.login(this.authForm.value)
        .subscribe(({ code, result }) => {
          localStorage.setItem('auth', result.token)
          this.spinLogIn = !this.spinLogIn;
          if (this.user.isAuthorized()) {
            this.activeModal.close();
            this.router.navigate(['/']);
            setTimeout(() => {
              location.reload();
            }, 100);
          }
        }, (error) => {
          this.headler.validation(error, this.authForm);
        })
    }
  }
}
