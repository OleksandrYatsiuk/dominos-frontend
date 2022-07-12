import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ErrorHandlerService } from '../../core/services/errorHandler.service';
import { confirmPasswordValidator } from '../../core/validators/confirm-password-validator';
import { catchError, EMPTY, filter, Observable } from 'rxjs';
import { MessageService } from 'primeng/api';
import { Select, Store } from '@ngxs/store';
import { ChangePasswordAction, UpdateUserProfileAction } from '../state/auth.actions';
import { AuthState } from '../state/auth.state';
import { User } from '../auth.model';
import { FileOptions } from '@shared/components/file-uploader/file-uploader.component';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserSettingsComponent implements OnInit {
  message: { type: string; message: string; };

  @Select(AuthState.current) user$: Observable<User>

  currentUser: any;
  public date: string;
  constructor(
    private handler: ErrorHandlerService,
    private title: Title,
    private formBuilder: UntypedFormBuilder,
    private _ms: MessageService,
    private _store: Store,
    private _cd: ChangeDetectorRef) { }

  image: File;
  updateProfileForm: UntypedFormGroup;
  changePasswordForm: UntypedFormGroup;
  imgForm: UntypedFormGroup;
  spinEditProfile = false;
  spinChangePassword = false;

  ngOnInit(): void {
    this.title.setTitle('User Settings');

    this.user$.pipe(filter(result => result ? true : false), untilDestroyed(this))
      .subscribe(user => {
        this.initUpdateProfile(user);
        this.initForm();
        this._cd.detectChanges()
      });

  }

  onUpload(event: FileOptions): void {
    if (event.isDelete) {
      this.updateProfileForm.controls.image.setValue(null);
    }
    this.image = event.value;
  }

  onSubmit(): void {
    this.updateProfileForm.markAllAsTouched();
    if (this.updateProfileForm.valid) {
      this.spinEditProfile = !this.spinEditProfile;
      this._store.dispatch(new UpdateUserProfileAction(this.updateProfileForm.getRawValue(), this.image))
        .pipe(
          catchError((e) => {
            this.handler.validation(e, this.updateProfileForm);
            this.spinEditProfile = false;
            this._cd.detectChanges();
            return EMPTY;
          }))
        .subscribe(user => {
          this.spinEditProfile = false;
          this._ms.add({ severity: 'success', detail: 'User profile has been successfully updated!' });
          this._cd.detectChanges();
        })
    }
  }

  initForm(): void {
    this.changePasswordForm = this.formBuilder.group({
      newPassword: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    }, {
      validators: confirmPasswordValidator('confirmPassword', 'newPassword')
    })
  }

  initUpdateProfile(user: User): void {
    this.updateProfileForm = this.formBuilder.group({
      firstName: [user.firstName, [Validators.required]
      ],
      lastName: [user.lastName, [Validators.required]
      ],
      username: [{ value: user.username, disabled: true }, [Validators.required]],
      image: [user.image, []],
      email: [{ value: user.email, disabled: true }, [Validators.required, Validators.email]],
      birthday: [user.birthday ? new Date(user.birthday) : null, []],
      phone: [user.phone],
    });
  }

  changePassword(): void {
    this.changePasswordForm.markAllAsTouched();
    if (this.changePasswordForm.valid) {
      this.spinChangePassword = true;
      this._store.dispatch(new ChangePasswordAction(this.changePasswordForm.getRawValue()))
        .pipe(catchError(e => {
          this.spinChangePassword = false;
          this.handler.validation(e, this.changePasswordForm);
          return EMPTY;
        }),
          untilDestroyed(this)
        )
        .subscribe(() => {
          this.spinChangePassword = false;
          this._ms.add({ severity: 'success', detail: 'Password has been successfully changed!' })
          this.changePasswordForm.reset();
          this._cd.detectChanges();
        });
    }
  }
}
