import { IUser } from './IUser';

export interface IUserDao {
  findByEmail(email: IUser['email']): Promise<IUser | null>,
}
