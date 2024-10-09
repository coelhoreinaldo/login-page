import UserDao from "../dao/UserDao";
import { ILogin, IUser, UserBody } from "../Interfaces/user/IUser";
import { IUserDao } from "../Interfaces/user/IUserDao";
import * as bcrypt from 'bcrypt';

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

  public async register(user: UserBody) {
    const userFound = await this.userDao.findByEmail(user.email);
    if (userFound) return { status: 'conflict', data: { message: 'User already exists' } };

    const userPassword = bcrypt.hashSync(user.password, 10);
    const newUser = await this.userDao.create({ ...user, password: userPassword });
    const { id, name, email } = newUser as IUser;

    return { status: 'created', data: { id, name, email } };
  }
}