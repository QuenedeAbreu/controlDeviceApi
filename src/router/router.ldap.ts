import { Router } from 'express';
import * as controllerLdap from '../controller/controller.ldap';
import { privateRoute } from '../middleware/auth';

const LdapRouter = Router();
LdapRouter.post('/auth', controllerLdap.authenticateLdap);


export default LdapRouter;