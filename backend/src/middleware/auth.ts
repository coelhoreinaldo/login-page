import { NextFunction, Request, Response } from 'express';
import JWT from '../utils/JWT';
import User from '../database/models/user';

/* Função para extrair o token */
function extractToken(authorization: string) {
  return authorization.split(' ')[1];
}

async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: 'Token é obrigatório' });
  }

  const token = extractToken(authorization);

  try {
    const decoded = await JWT.verify(token);
    if (typeof decoded === 'string') return res.status(401).json({ message: 'Token inválido' });

    const user = await User.findOne({ where: { email: decoded.email } });

    if (!user) return res.status(401).json({ message: 'Token inválido' });

    next();
  } catch (e) {
    return res.status(401).json({ message: 'Token inválido' });
  }
}

export default authMiddleware;