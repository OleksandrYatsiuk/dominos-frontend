import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';
import { ErrorHandlerService } from 'src/app/core/services/errorHandler.service';
import { pluck } from 'rxjs/operators';
import { UserDataService } from '../../../auth/user-data.service';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private http: UserDataService,
    private _ref: DynamicDialogRef,
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private handler: ErrorHandlerService,
  ) { }

  public authForm: FormGroup;
  public spinLogIn = false;
  get username() { return this.authForm.get('username'); }
  get password() { return this.authForm.get('password'); }

  ngOnInit(): void {
    this.authForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  public close(): void {
    this._ref.close();
  }

  public login(): void {
    this.authForm.markAllAsTouched();
    if (this.authForm.valid) {
      this.spinLogIn = !this.spinLogIn;
      this.http.login(this.authForm.value)
        .pipe(pluck('result'))
        .subscribe(({ token }) => {
          this.userService.setCredentials(token)
          this.router.navigate(['/'], { replaceUrl: true }).then(() => location.reload())
        }, (error) => {
          this.spinLogIn = !this.spinLogIn;
          this.handler.validation(error, this.authForm);
        });
    }
  }
}
