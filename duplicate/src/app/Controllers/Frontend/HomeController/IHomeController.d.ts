import { Request, Response, NextFunction } from 'express';

export default interface HomeControllerInterface {
    Index(req: Request, res: Response, next: NextFunction),
    Course(req: Request, res: Response, next: NextFunction),
    Register(req: Request, res: Response, next: NextFunction)
}