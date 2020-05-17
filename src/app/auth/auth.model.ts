export interface UserLogin {
  username: string;
  password: string;
}

export interface User extends UserLogin {
  fullName: string;
  email: string;
  confirmPassword: string;
}
