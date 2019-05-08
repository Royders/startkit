import { NextFunction, Request, Response } from 'express';
export declare let logging: (err: Error, req: Request, res: Response, next: NextFunction) => void;
export declare let clientErrorHandler: (err: Error, req: Request, res: Response, next: NextFunction) => void;
export declare let errorHandler: (err: Error, req: Request, res: Response, next: NextFunction) => void;
