import { v4 as uuidv4 } from 'uuid';
import { Request, Response, NextFunction } from 'express';

export default () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/explicit-module-boundary-types
  return (req: Request, res: Response, next: NextFunction) => {
    const requestId = uuidv4();
    if (!req.feathers) {
      req.feathers = {};
    }
    req.feathers.requestId = requestId;
    next();
  };
};
