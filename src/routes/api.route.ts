import express, { Router, Request, Response } from 'express';

const router: Router = express.Router();

router.get('/', async (req: Request, res: Response, next) => {
    try {
        res.status(200).json({
            message: 'Hello, this is the root endpoint!',
            version: '1.0.0',
            api_docs: '/api-docs'
        });
    } catch (error) {
        next(error);
    }
});


export default router;
