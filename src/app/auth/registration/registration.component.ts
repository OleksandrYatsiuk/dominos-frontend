import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RootService } from 'src/app/shared/root.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  registerForm: FormGroup;
  constructor(
    private rootService: RootService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {

    this.registerForm = this.formBuilder.group({
      fullName: ['', [Validators.required, Validators.maxLength(15)]],
      username: ['', [Validators.required, Validators.maxLength(15)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]

    });
  }

  hasError(control: string, error: string): boolean {
    return this.registerForm.controls[control].hasError(error);
  }

  register() {
    console.log(this.registerForm);
  }



}
