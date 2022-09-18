import "reflect-metadata";
import { createConnection, DataSource } from "typeorm";
import * as express from "express";
import * as cors from 'cors'
import * as session from 'express-session'
import * as fs from 'fs';
import * as https from 'https';
import authRouter from './route/authRouter'
import postRouter from './route/postRouter'
import animalTypeRouter from './route/animalTypeRouter'
import adminRouter from './route/adminRouter'
import messageRouter from './route/messageRouter'
import userRouter from './route/userRouter'
import { appDataSource } from "./dataSource";
import { User } from "./entity/User";
import { renameFile, uplaodMiddleware } from "./upload";
appDataSource.initialize().then(async connection => {
    const key = fs.readFileSync('./key.pem', 'utf8');
    const cert = fs.readFileSync('./cert.pem', 'utf8');
    // create express app
    const app = express();
    app.use(express.json());
    app.use(cors({
        origin: 'http://localhost:3000',
        credentials: true,
        methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    }))
    app.use(session({
        secret: 'adsfdghsgearfsgrdthftehetrt',
        resave: false,
        saveUninitialized: false,
        cookie: {
            sameSite: 'none',
            maxAge: 1000 * 60 * 15,
            httpOnly: true,
            secure: true
        }
    }))

    app.post('/upload', uplaodMiddleware, renameFile('img'), (req, res) => {
        res.json({
            fileUrl: (req as any).fileUrl
        })
    })
    app.use('/img', express.static('img', {
        extensions: ['png', 'jpg', 'jpeg']
    }))
    app.use('/auth', authRouter)
    app.use((request, response, next) => {
        const user = (request.session as any).user as User | undefined;
        if (!user || user.blocked) {
            response.status(401).json({ error: 'Unauthorized' })
            return;
        }
        next();
    });

    app.use('/post', postRouter);
    app.use('/animal-type', animalTypeRouter);
    app.use('/message', messageRouter);
    app.use('/user', userRouter);
    app.use('/admin', adminRouter);

    const server = https.createServer({
        key: key,
        cert: cert,
    }, app)

    server.listen(8000, () => {
        console.log('Server is listening')
    })

}).catch(error => console.log(error));
