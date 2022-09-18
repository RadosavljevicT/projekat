import { NextFunction, Request, Response } from "express";
import { appDataSource } from "../dataSource";
import { User } from "../entity/User";

export type ObjectType<T> = {
  new(): T
}

export default function accessMiddleware<T>(entityClass: ObjectType<T>, getUserId: (val: T) => number) {
  return async function (req: Request, res: Response, next: NextFunction) {
    const user = (req.session as any).user as User;
    const value = await appDataSource.getRepository(entityClass).findOne({
      where: {
        //@ts-ignore
        id: Number(req.params.id)
      }
    })
    if (user.admin || !value || user.id === getUserId(value)) {
      (req as any).entity = value;
      next();
    } else {
      res.status(403).json({ error: 'Cannot access entity' });
    }
  }
}