import { v4 as uuidv4 } from 'uuid';
import { Namespace } from 'cls-hooked';

function correlation(namespace: Namespace) {
  return (req: any, res: any, next: any) => {
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
