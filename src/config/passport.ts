import passport from 'passport';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';
import { User, IUser } from '../models/user';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const notAuthorizedJson = {
  status: 401,
  message: 'Unauthorized',
}
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET as string,
}
passport.use(new JWTStrategy(options, async (payload, done) => {
  const user = await User.findByPk(payload.id);
  if (user) {
    return done(null, user);
  } else {
    return done(notAuthorizedJson, false);
  }
}));

export const generateToken = (data: object) => {
  return jwt.sign(data, process.env.JWT_SECRET as string, {
    expiresIn: '1d'
  });
}
export default passport;