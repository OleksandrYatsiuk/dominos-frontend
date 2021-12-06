import { Injectable } from '@angular/core';
import { State, Action, Selector, StateContext } from '@ngxs/store';
import { tap } from 'rxjs';
import { User } from 'src/app/module-auth/auth.model';
import { UserDataService } from 'src/app/module-auth/user-data.service';
import { CurrentUserAction } from './users.actions';

export interface UsersStateModel {
  user: User | null;
}

@State<UsersStateModel>({
  name: 'users',
  defaults: {
    user: null
  }
})
@Injectable()
export class UsersState {

  constructor(private _userService: UserDataService) { }

  @Selector()
  public static getState(state: UsersStateModel) {
    return state;
  }

  @Action(CurrentUserAction)
  getCurrentUser(ctx: StateContext<UsersStateModel>) {
    const state = ctx.getState();
    return this._userService.current().pipe(tap(user => {
      ctx.setState({ ...state, user });
    }));
  }
}
