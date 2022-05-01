import { Router } from 'express';
import * as controllerUser from '../controller/controller.user';
import { privateRoute } from '../middleware/auth';

const UserRouter = Router();

UserRouter.get('/', privateRoute, controllerUser.getUser);
UserRouter.post('/auth', controllerUser.loginUser);




export default UserRouter;