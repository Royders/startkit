/// <reference types="node" />
import * as express from 'express';
import * as http from 'http';
import { APIRoute } from './routes/api';
import { OrderRoute } from './routes/order';
import { UserRoute } from './routes/user';
declare class Server {
    app: express.Application;
    userRoutes: UserRoute;
    env: string;
    apiRoutes: APIRoute;
    orderRoutes: OrderRoute;
    port: number | string;
    protected server: http.Server;
    private mongoUrl;
    constructor(port?: number | string);
    private start;
    private applyLogger;
    private applyMiddleWare;
    private applyRoutes;
    private mongoSetup;
}
export default Server;
