import { Request, Response } from 'express';
import { User, IUser } from '../models/user';
import { generateToken } from '../config/passport';
import { authenticateLdap } from '../ldap/ldap';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { IUserRole, roleUser } from '../helpers/roleUser/roleUser';


dotenv.config();

// Get all users
export const getUser = async (req: Request, res: Response) => {
  try {
    const Users: Array<IUser> = await User.findAll();
    // console.log(Users);
    if (Users.length === 0) {
      res.status(404).json({
        qtdUsers: Users.length,
        message: 'No user found',
      });
    } else {
      res.status(200).json({
        qtdUsers: Users.length,
        Users
      });
    }
  } catch (error) {
    res.json(error);
  }
}


// Controller de login do usuário
export const loginUser = async (req: Request, res: Response) => {

  try {
    const { username, password, update } = req.body;
    var roleUserFinall = 2;



    const ResponseUser = await User.findOne({ where: { username } });

    // ---------------- Updade Forced User from Ldap -------------------------
    if (update) {

      const responseLdap = await authenticateLdap({ username, password })
      if (ResponseUser && responseLdap.auth) {
        if (roleUser(responseLdap.user as IUserRole)) {
          roleUserFinall = roleUser(responseLdap.user as IUserRole).roleNumber;
        }
        try {
          const updateUser = await User.update({
            name: responseLdap.user.displayName,
            username: username,
            password: bcrypt.hashSync(password, 10),
            email: responseLdap.user.userPrincipalName,
            role: roleUserFinall,
            guid: responseLdap.user.pwdLastSet,
            domain: responseLdap.user.userPrincipalName.split('@')[1],
          }, {
            where: {
              id: ResponseUser.id as unknown as number
            }
          })

          if (updateUser) {
            const updeteNewUser = await User.findOne({ where: { id: ResponseUser.id as unknown as number } });
            res.status(200).json({
              message: 'User updated',
              token: generateToken({ id: ResponseUser.id }),
              user: updeteNewUser,
            });
          } else {
            res.status(500).json({
              message: 'User not updated',
            });
          }
        } catch (error) {
          res.status(500).json({
            message: 'Error updating user',
            error
          });

        }

      } else {
        res.status(401).json({
          message: 'User not found',
        });

      }
      return;
    }
    // ---------------- End Updade Forced User from Ldap -------------------------
    if (ResponseUser) {
      if (bcrypt.compareSync(password, ResponseUser.password)) {
        res.status(200).json({
          token: generateToken({ id: ResponseUser.id }),
          user: ResponseUser
        });
      } else {
        res.status(401).json({
          message: 'Authentication failed!'
        });
      }
    } else {

      const responseLdap = await authenticateLdap({ username, password })
      if (roleUser(responseLdap.user as IUserRole)) {
        roleUserFinall = roleUser(responseLdap.user as IUserRole).roleNumber;
      }

      if (responseLdap.auth) {
        const newUser = await User.create({
          name: responseLdap.user.displayName,
          username: username,
          password: bcrypt.hashSync(password, 10),
          email: responseLdap.user.userPrincipalName,
          role: roleUserFinall,
          guid: responseLdap.user.pwdLastSet,
          domain: responseLdap.user.userPrincipalName.split('@')[1],
        });

        if (newUser) {
          const user = await User.findOne({ where: { username } });
          res.status(200).json({
            token: generateToken({ id: newUser.id }),
            user: user
          });
        } else {
          res.status(500).json({
            message: 'Error creating user'
          });
        }
      } else {
        res.status(401).json({
          message: 'Authentication failed!'
        });
      }
    }
  } catch (error) {
    res.json(error);
  }
}
