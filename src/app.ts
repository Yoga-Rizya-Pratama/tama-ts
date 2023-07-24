import express, { Application, ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { Server } from 'http';
import { config } from 'dotenv';
import createHttpError from 'http-errors';
import cors from 'cors';
import mainRouter from './routes/main.router';
import morgan = require('morgan');

/**
 * uncomment this import if you want to handle file
 * import { upload } from './utils/file.util'
 * import path = require('path');
 */

config();

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'))

/**
 * if you want to handle file, uncomment this code, you can change setting inside file.util.js 
 * app.use(upload.single("image"));
 * app.use("/image", express.static(path.join(__dirname, "images")));
*/

app.use('/', mainRouter)

app.use((req: Request, res: Response, next: NextFunction) => {
    next(new createHttpError.NotFound())
})

const errorHandler: ErrorRequestHandler = ((err, req, res, next) => {
    res.status(err.status || 500)
    res.send({
        status: err.status || 500,
        message: err.message
    })
})


app.use(errorHandler)

const port: Number = Number(process.env.PORT) || 3000

export const server: Server = app.listen(port, () => {
    console.log(`api is running on port ${port} you are good to go!!!`)
})