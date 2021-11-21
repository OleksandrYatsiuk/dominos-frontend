export interface UserLogin {
  username: string;
  password: string;
}

export interface User extends UserLogin {
  readonly id: string
  fullName: string;
  email: string;
  role: any,
  confirmPassword: string;
}
