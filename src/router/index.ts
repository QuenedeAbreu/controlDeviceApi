import { Router, Request, Response, ErrorRequestHandler } from 'express'
import userRouter from './router.user';
import LdapRouter from './router.ldap';
import ComputerRouter from './router.computer';
const router = Router();

router.use('/user', userRouter);
router.use('/computers', ComputerRouter);
router.use('/ldap', LdapRouter)




//page not found
router.use((req: Request, res: Response) => {
  req
  res.status(404).json({
    message: "Page not found"
  });
});

//Error handler
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err.status) {
    res.status(err.status)
  } else {
    res.status(400)
  }
  if (err.message) {
    res.json(err.message);
  } else {
    res.json({
      message: "Ocorreu um error"
    });
  }
};
router.use(errorHandler)


export default router;