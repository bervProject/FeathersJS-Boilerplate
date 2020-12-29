import { v4 as uuidv4 } from 'uuid';
import { Namespace } from 'cls-hooked';
import { Request, Response, NextFunction } from 'express';

function correlation(namespace: Namespace) {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  return (req: Request, res: Response, next: NextFunction) => {
    const correlationId = uuidv4();
    if (!req.feathers) {
      req.feathers = {};
    }
    req.feathers.correlationId = correlationId;
    namespace.run(() => {
      namespace.set('correlationId', correlationId);
      next();
    });
  };
}
export default correlation;
