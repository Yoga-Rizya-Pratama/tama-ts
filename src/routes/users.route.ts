import express, { Router, Request, Response } from 'express';
import userModel from '../models/user.model';

const router: Router = express.Router();

router.get('/', async (req: Request, res: Response, next) => {
    try {
        const data = await userModel.find();
        res.status(200).json({
            data
        });
    } catch (error) {
        next(error);
    }
});

router.get('/:id', async (req, res, next) => {
    const id = req.params.id;

    try {
        const user = await userModel.find({ _id: id });
        if (user.length < 0) res.status(404).json({ message: 'User Not Found Ya' })
        res.status(200).json(user);
    } catch (error: any) {
        if (error.name === 'CastError') res.status(404).json({ message: 'User Not Found' })
        else res.status(500).json({ message: 'Internal Server Error', error: error });
    }
});

router.post('/', async (req: Request, res: Response, next) => {
    const data: { email: string, name: string, address?: object } = req.body;
    const newUser = new userModel(data)

    try {
        const newData = await newUser.save()
        res.status(201).json({
            data: newData
        })
    } catch (error) {
        next(error);
    }
});

router.patch('/:id', async (req: Request, res: Response, next) => {
    const id = req.params.id

    try {
        const data = await userModel.findOneAndUpdate({ _id: id }, req.body, { new: true })
        res.status(201).json(data)
    } catch (error: any) {
        if (error.name === 'CastError') res.status(404).json({ message: 'User Not Found' })
        else res.status(500).json({ message: 'Internal Server Error', error: error });
    }
});

router.delete('/:id', async (req: Request, res: Response, next) => {
    const id = req.params.id

    try {
        const data = await userModel.deleteOne({ _id: id })
        res.status(200).json({ message: 'User deleted' })
    } catch (error: any) {
        if (error.name === 'CastError') res.status(404).json({ message: 'User Not Found' })
        else res.status(400).json({ message: 'Internal Server Error', error: error });
    }
});


export default router;
