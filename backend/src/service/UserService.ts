import UserDao from "../dao/UserDao";
import { ILogin } from "../Interfaces/user/IUser";
import { IUserDao } from "../Interfaces/user/IUserDao";

// TODO: adicionar JWT
// TODO: tratar erros

export default class UserService {
  constructor(
    private userDao: IUserDao = new UserDao(),
  ) { }

  public async login(loginData: ILogin) {
    const user = await this.userDao.findByEmail(loginData.email);
    if (!user) {
      throw new Error("User not found");
    }

    if (user.password !== loginData.password) {
      throw new Error("Invalid password");
    }

    return { status: 'successful', data: user };
  }
}