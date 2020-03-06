import { Component, OnInit } from '@angular/core';
import { RootService } from '../shared/root.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  changePasswordForm: FormGroup;

  ngOnInit() {

    this.changePasswordForm = this.formBuilder.group({
      currentPassword: ['', [Validators.required, Validators.maxLength(15)]],
      newPassword: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    })
  }

  onSubmit() {
    console.log(this.changePasswordForm.value);
  }

  hasError(control: string, error: string): boolean {
    return this.changePasswordForm.controls[control].hasError(error);
  }
}
