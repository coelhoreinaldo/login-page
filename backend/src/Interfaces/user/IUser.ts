export interface UserBody {
  name: string,
  email: string,
  password: string,
}
export interface IUser extends UserBody {
  id: number
}

export interface ILogin {
  email: string,
  password: string,
}
