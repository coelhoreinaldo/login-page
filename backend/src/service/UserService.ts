import JWT from "../utils/JWT";
import UserDao from "../dao/UserDao";
import { ILogin, IUser, UserBody } from "../Interfaces/user/IUser";
import { IUserDao } from "../Interfaces/user/IUserDao";
import * as bcrypt from 'bcrypt';
import { ServiceResponse } from "../Interfaces/ServiceResponse";
import Token from "../Interfaces/Token";

export default class UserService {
  constructor(
    private userDao: IUserDao = new UserDao(),
    private jwtService = JWT
  ) { }

  public async login(loginData: ILogin): Promise<ServiceResponse<Token>> {
    const user = await this.userDao.findByEmail(loginData.email);

    if (user) {

      if (!bcrypt.compareSync(loginData.password, user.password)) {
        return { status: 'invalid_data', data: { message: 'Invalid email or password' } };
      }
      const { email } = user as IUser;
      const token = this.jwtService.sign({ email });
      return { status: 'successful', data: { token } };
    }

    return { status: 'not_found', data: { message: 'Invalid email or password' } };
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