import { ChangePassword, GeoLocation, UpdateUserProfile, UserLogin } from "../auth.model";

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

export class ChangePasswordAction {
  public static readonly type = '[Auth] Change password for current user';
  constructor(public payload: ChangePassword) { }
}

export class UpdateGeoLocationAction {
  public static readonly type = '[Auth] Update current user geo location';
  constructor(public payload: GeoLocation) { }
}

export class CheckAccessTokenAction {
  public static readonly type = '[Auth] Check is access token available';
}

export class UpdateUserProfileAction {
  public static readonly type = '[Auth] Update current user profile data';
  constructor(public payload: Partial<UpdateUserProfile>, public file?: File) { }
}