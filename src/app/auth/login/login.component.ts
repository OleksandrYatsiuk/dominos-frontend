import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { UserService } from 'src/app/core/services/user.service';
import { ValidationMessages } from '../../core/models/error-list';
import { ErrorHeadlerService } from 'src/app/core/services/errorHeadler.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<LoginComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private http: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private user: UserService,
    private headler: ErrorHeadlerService,
  ) { }

  public authForm: FormGroup;
  public spinLogIn = false;
  public validations = ValidationMessages;
  get username() { return this.authForm.get('username') };
  get password() { return this.authForm.get('password') };

  ngOnInit(): void {
    this.authForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.maxLength(10)]],
      password: ['', [Validators.required]],
    })
  }

  public close(): void {
    this.dialogRef.close();
  }

  public login(): void {
    this.authForm.markAllAsTouched();
    if (this.authForm.valid) {
      this.spinLogIn = !this.spinLogIn;
      this.http.login(this.authForm.value)
        .subscribe(({ code, result }) => {
          localStorage.setItem('auth', result.token)
          this.spinLogIn = !this.spinLogIn;
          if (this.user.isAuthorized()) {
            this.router.navigate(['/']);
            setTimeout(() => {
              location.reload();
            }, 100);
          }
        }, (error) => {
          this.spinLogIn = false;
          this.headler.validation(error, this.authForm);
        })
    }
  }
}
