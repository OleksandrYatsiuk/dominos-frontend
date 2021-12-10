import { Injectable } from '@angular/core';
import { StorageService } from '@core/services/storage.service';
import { State, Action, Selector, StateContext } from '@ngxs/store';
import { mergeMap, of, tap } from 'rxjs';
import { AuthResponse, User } from '../auth.model';
import { UserDataService } from '../user-data.service';
import { ChangePasswordAction, CheckAccessTokenAction, CurrentUserAction, LoginAction, LogoutAction, UpdateGeoLocationAction, UpdateUserProfileAction } from './auth.actions';

export interface AuthStateModel {
  credentials: AuthResponse;
  user: User | null;
}

@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    credentials: { token: null, expiredAt: null },
    user: null
  }
})
@Injectable()
export class AuthState {

  private _key = 'dominos__auth';

  constructor(
    private _storageService: StorageService,
    private _userDataService: UserDataService
  ) {
  }

  @Selector()
  public static getState(state: AuthStateModel) {
    return state;
  }


  @Selector()
  public static current(state: AuthStateModel): User {
    return state.user;
  }

  @Selector()
  public static credentials(state: AuthStateModel): AuthResponse {
    return state.credentials;
  }

  @Action(LoginAction)
  login(ctx: StateContext<AuthStateModel>, { payload }: LoginAction) {
    const state = ctx.getState();
    return this._userDataService.login(payload).pipe(
      tap(response => {
        this._storageService.setItem(this._key, response);
        ctx.setState({ ...state, credentials: response });
      }))
  }

  @Action(LogoutAction)
  logout(ctx: StateContext<AuthStateModel>) {
    const state = ctx.getState();
    return this._userDataService.logout().pipe(tap(() => {
      this._storageService.removeItem(this._key);
      ctx.setState({ ...state, credentials: { token: null, expiredAt: null }, user: null });
    }));
  }

  @Action(CurrentUserAction)
  current(ctx: StateContext<AuthStateModel>) {

    const state = ctx.getState();

    if (state.credentials.token) {
      return this._userDataService.current().pipe(tap(user => {
        ctx.setState({ ...state, user });
      }));
    }
  }

  @Action(CheckAccessTokenAction)
  credentials(ctx: StateContext<AuthStateModel>) {
    const state = ctx.getState();

    const credentials = this._storageService.getItem(this._key);

    if (credentials) {
      ctx.setState({ ...state, credentials: credentials });
    }
  }

  @Action(ChangePasswordAction)
  changePassword(ctx: StateContext<AuthStateModel>, { payload }: ChangePasswordAction) {
    return this._userDataService.changePassword(payload)
  }

  @Action(UpdateGeoLocationAction)
  updateGeoLocation(ctx: StateContext<AuthStateModel>, { payload }: UpdateGeoLocationAction) {
    return this._userDataService.updateLocation(payload).pipe(tap((user) => {
      const state = ctx.getState();
      ctx.setState({ ...state, user });
    }))
  }
  @Action(UpdateUserProfileAction)
  updateProfile(ctx: StateContext<AuthStateModel>, { payload, file }: UpdateUserProfileAction) {
    const state = ctx.getState();
    return this._userDataService.updateProfile(payload)
      .pipe(mergeMap(user => file ? this._userDataService.updateImage(file) : of(user)),
        tap(user => {
          ctx.setState({ ...state, user });
        }))
  }
}
