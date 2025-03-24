import { UserRoles } from '@core/models/user.model';

export interface UserLogin {
  username: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  expiredAt: Date;
}

export interface ChangePassword {
  newPassword: string;
  confirmPassword: string;
}

export interface GeoLocation {
  latitude: number | null,
  longitude: number | null
}

export interface User extends GeoLocation {
  readonly id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  role: UserRoles;
  image: string | null;
  birthday: Date | null;
  phone: string | null;
  createdAt: Date;
  updatedAt: Date;
}


export interface UpdateUserProfile extends Pick<User, 'firstName' | 'lastName' | 'birthday' | 'phone' | 'image'> {
}

