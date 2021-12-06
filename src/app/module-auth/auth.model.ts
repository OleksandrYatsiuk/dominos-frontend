import { UserRoles } from "@core/models/user.model";

export interface UserLogin {
  username: string;
  password: string;
}

export interface User {
  readonly id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  role: UserRoles,
  birthday: Date | null;
  phone: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthResponse {
  token: string;
  expiredAt: Date;
}