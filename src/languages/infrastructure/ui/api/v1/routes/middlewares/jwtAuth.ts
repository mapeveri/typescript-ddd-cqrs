import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export default function verifyToken(req: Request, res: Response, next: any) {
  const token: any = req.headers['authorization'];

  if (!token) {
    return res.status(403).send({
      message: 'No token provided!',
    });
  }

  jwt.verify(token, process.env.JWT_SECRET || '', (err: any, decoded: any) => {
    if (err) {
      return res.status(401).send({
        message: 'Unauthorized!',
      });
    }

    req.userId = decoded.id;
    next();
  });
}
