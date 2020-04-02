import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { RootService } from '../core/services/root.service';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss']
})
export class UserSettingsComponent implements OnInit {

  constructor(
    private http: RootService,
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
      this.http.changePassword(this.changePasswordForm.value).subscribe(({ code }) => {
        code === 200 ? console.log("Password change success!") : console.warn("Pasword was now changed!");
      })
    }

  }

  hasError(control: string, error: string): boolean {
    return this.updateProfileForm.controls[control].hasError(error);
  }


}
