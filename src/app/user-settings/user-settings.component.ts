import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss']
})
export class UserSettingsComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) { }
  updateProfileForm: FormGroup;
  changePasswordForm: FormGroup;


  ngOnInit() {
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
    console.log(this.changePasswordForm.value);

  }

  hasError(control: string, error: string): boolean {
    return this.updateProfileForm.controls[control].hasError(error);
  }


}
