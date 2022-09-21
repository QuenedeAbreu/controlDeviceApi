import { Router } from 'express';
import { privateRoute } from '../middleware/auth';
import * as controllerComputer from '../controller/controller.computer'
import * as controllerComments from '../controller/controller.comments'
const ComputerRouter = Router();

ComputerRouter.get('/', privateRoute, controllerComputer.getAllComputers);
ComputerRouter.post('/', privateRoute, controllerComputer.postCreateComputer);
ComputerRouter.put('/:id', privateRoute, controllerComputer.putUpdateStatusComputer);
// ComputerRouter.get('/', privateRoute, controllerComputer.getComputerByPatrimony);


//Routes de Comments
ComputerRouter.get('/:computer_id/comments', privateRoute, controllerComments.getAllComments);

export default ComputerRouter;
