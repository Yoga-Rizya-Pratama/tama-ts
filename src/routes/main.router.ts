import express, { Router, Request, Response } from 'express';
import apiRouter from './api.route';
// import your own routes
import usersRouter from './users.route';

const mainRouter: Router = express.Router();

mainRouter.use('/', apiRouter)
// You can write mainRouter.use('/your-path', router)
mainRouter.use('/user', usersRouter)

export default mainRouter;