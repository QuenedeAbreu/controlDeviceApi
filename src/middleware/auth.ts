import { Request, Response, NextFunction } from 'express'
import passport from 'passport';



const notAuthorizedJson = {
  status: 401,
  message: 'Unauthorized',
}
export const privateRoute = (req: Request, res: Response, next: NextFunction) => {
  req.user = req.user;
  passport.authenticate('jwt', (err, user) => {
    if (user) {
      next();
    }
    else {
      next(notAuthorizedJson);
    }
  })(req, res, next);
}