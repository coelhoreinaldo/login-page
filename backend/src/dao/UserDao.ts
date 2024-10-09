import { IUser, UserBody } from "../Interfaces/user/IUser";
import { IUserDao } from "../Interfaces/user/IUserDao";
import User from "../database/models/user";

export default class implements IUserDao {
  private model = User

  public async findByEmail(email: IUser["email"]): Promise<IUser | null> {
    return await this.model.findOne({ where: { email } });
  }

  public async create(data: UserBody): Promise<IUser> {
    const user = await this.model.create(data);
    const { id, email, password, name } = user;
    return { id, email, password, name };
  }
}