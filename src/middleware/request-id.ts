import { v4 as uuidv4 } from 'uuid';

export default () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (req: any, res: any, next: any) => {
    const requestId = uuidv4();
    if (!req.feathers) {
      req.feathers = {};
    }
    req.feathers.requestId = requestId;
    next();
  };
};
