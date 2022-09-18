import { NextFunction, Request, Response } from "express";
import { User } from "../entity/User";


export default function isAdminMiddleware(req: Request, res: Response, next: NextFunction) {
  const user = (req.session as any).user as User;
  if (!user.admin) {
    res.status(403).json({ error: 'Forbidden' })
    return;
  }
  next();
}