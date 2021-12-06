import { Injectable } from '@angular/core';
import { StorageService } from '@core/services/storage.service';
import { State, Action, Selector, StateContext } from '@ngxs/store';
import { tap } from 'rxjs';
import { AuthResponse, User } from '../auth.model';
import { UserDataService } from '../user-data.service';
import { CheckAccessTokenAction, CurrentUserAction, LoginAction, LogoutAction } from './auth.actions';

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
    this._storageService.removeItem(this._key);
    ctx.setState({ ...state, credentials: { token: null, expiredAt: null }, user: null });
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
}
