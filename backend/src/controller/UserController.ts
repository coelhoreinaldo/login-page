import UserService from "../service/UserService";
import { Request, Response } from "express";
import mapStatusHTTP from "../utils/mapStatusHTTP";

export default class UserController {
  constructor(
    private userService: UserService = new UserService()
  ) { }

  public async login(req: Request, res: Response): Promise<Response> {
    const loginData = req.body;
    const serviceResponse = await this.userService.login(loginData);
    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data.email)
  }

  public async register(req: Request, res: Response): Promise<Response> {
    const serviceResponse = await this.userService.register(req.body);
    if (serviceResponse.status !== 'successful') {
      return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
    }

    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }
}