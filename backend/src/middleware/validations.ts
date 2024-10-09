import { NextFunction, Request, Response } from 'express';
import JWT from '../utils/JWT';
import Joi = require('joi');

export const loginSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
});


class Validations {
  static validateUser(req: Request, res: Response, next: NextFunction): Response | void {
    const { error } = loginSchema.validate(req.body);
    if (error)
      return res.status(400).json({ message: error.message });

    const validEmail = /\S+@\S+\.\S+/;
    if (!validEmail.test(req.body.email) || req.body.password.length < 6)
      return res.status(401).json({ message: 'Invalid email or password' });

    next();
  }

  static validateLogin(req: Request, res: Response, next: NextFunction): Response | void {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: 'All fields must be filled' });

    next();
  }

  static validateToken(req: Request, res: Response, next: NextFunction): Response | void {
    const token = req.headers.authorization;

    if (!token)
      return res.status(401).json({ message: 'Token not found' });

    const verifyToken = JWT.verify(token);

    if (verifyToken === 'Token must be a valid token')
      return res.status(401).json({ message: verifyToken });

    req.body.userData = verifyToken;
    delete req.body.userData.password;
    next();
  }
}

export default Validations;
