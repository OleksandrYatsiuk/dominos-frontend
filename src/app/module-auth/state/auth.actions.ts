import { UserLogin } from "../auth.model";

export class AuthAction {
  public static readonly type = '[Auth] Add item';
  constructor(public payload: string) { }
}

export class LoginAction {
  public static readonly type = '[Auth] Login';
  constructor(public payload: UserLogin) { }
}
export class LogoutAction {
  public static readonly type = '[Auth] Logout';
}

export class CurrentUserAction {
  public static readonly type = '[Auth] Get Current User';
}

export class CheckAccessTokenAction {
  public static readonly type = '[Auth] Check is access token available';
}