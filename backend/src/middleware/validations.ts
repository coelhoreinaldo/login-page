import { NextFunction, Request, Response } from 'express';
import Joi = require('joi');

export const loginSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
});


class Validations {
  static validateLogin(req: Request, res: Response, next: NextFunction): Response | void {
    const { error } = loginSchema.validate(req.body);
    if (error)
      return res.status(400).json({ message: error.message });

    const validEmail = /\S+@\S+\.\S+/;
    if (!validEmail.test(req.body.email) || req.body.password.length < 6)
      return res.status(401).json({ message: 'Invalid email or password' });

    next();
  }
}

export default Validations;
