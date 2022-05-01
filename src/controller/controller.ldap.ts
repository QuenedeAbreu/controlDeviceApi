import { Request, Response } from 'express';
import { ad as activedirectory } from '../config/activedirectory';
import dotenv from 'dotenv';
dotenv.config();

type User = {
  username: string;
  password?: string;
}
export const authenticateLdap = async (req: Request, res: Response) => {
  if (req.headers.secret_key !== process.env.JWT_SECRET) {
    return res.status(401).json({
      message: 'Unauthorized'
    })
  }
  const user: User = req.body;
  try {
    activedirectory.authenticate(`${user.username}${process.env.AD_SUFIX}`, user.password as string, (err: any, auth: any) => {
      if (auth) {

        activedirectory.findUser(user.username as string, (err: any, user: any) => {
          if (err) {
            res.status(401).json({
              message: 'Authentication failed!',
              auth: auth,
              err
            });
          } else {
            res.status(200).json({
              message: 'Authenticated!',
              auth: auth,
              user
            });
          }
        })
      }
      else {
        res.status(401).json({
          message: 'Authentication failed!',
          err,
          auth: auth,
        });
      }
    });
  } catch (error) {
    res.status(500).json(error);
  }
}
