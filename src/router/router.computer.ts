import { Router } from 'express';
import { privateRoute } from '../middleware/auth';
import * as controllerComputer from '../controller/controller.computer'
const ComputerRouter = Router();

ComputerRouter.get('/', privateRoute, controllerComputer.getAllComputers);



export default ComputerRouter;
