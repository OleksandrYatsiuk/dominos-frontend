import { Component, OnInit, ErrorHandler } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { RootService } from '../core/services/root.service';
import { ErrorHeadlerService } from '../core/services/errorHeadler.service';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss']
})
export class UserSettingsComponent implements OnInit {

  constructor(
    private http: RootService,
    private headler: ErrorHeadlerService,
    private title: Title,
    private formBuilder: FormBuilder) { }
  updateProfileForm: FormGroup;
  changePasswordForm: FormGroup;


  ngOnInit() {
    this.title.setTitle('User Settings')
    this.updateProfileForm = this.formBuilder.group({
      fullName: ['', [Validators.required]],
      username: ['', [Validators.required, Validators.maxLength(15)]],
      birthdaty: ['', []],
      phone: ['', []],
    })

    this.changePasswordForm = this.formBuilder.group({
      currentPassword: ['', [Validators.required, Validators.maxLength(15)]],
      newPassword: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    })
  }

  onSubmit() {
    console.log(this.updateProfileForm.value);
  }

  changePassword() {
    if (this.changePasswordForm.valid) {
      console.log(this.changePasswordForm.controls);

      this.http.changePassword(this.changePasswordForm.value).subscribe(({ code }) => {
        if (code === 200) {
          console.log("Password change success!")
        }
      }, ({code, result}) => {
        this.headler.errorMessage.subscribe(data => {
        this.changePasswordForm.controls['currentPassword'].setErrors({ serverError: data[0].message });
        })
      })
    }

  }
  hasError(control: string, error: string): boolean {
    return this.updateProfileForm.controls[control].hasError(error);
  }


}
