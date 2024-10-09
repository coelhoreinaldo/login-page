import { IUser, UserBody } from './IUser';

export interface IUserDao {
  findByEmail(email: IUser['email']): Promise<IUser | null>,
  create(user: UserBody): Promise<IUser>,
}
