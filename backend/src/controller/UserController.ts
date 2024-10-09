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
    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data)
  }

  public async register(req: Request, res: Response): Promise<Response> {
    const serviceResponse = await this.userService.register(req.body);
    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }

  public async getProfile(req: Request, res: Response): Promise<Response> {
    const { email } = req.body.userData;
    const serviceResponse = await this.userService.getUser(email);
    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }
}