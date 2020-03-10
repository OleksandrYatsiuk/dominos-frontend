export interface UserLogin {
  username: String,
  password: String
}

export interface User extends UserLogin {
  fullName: String,
  email: String,
  confirmPassword: String
}