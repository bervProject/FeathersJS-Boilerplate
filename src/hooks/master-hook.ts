// Use this hook to manipulate incoming or outgoing data.
import { HookContext, Hook } from '@feathersjs/feathers';
import logger from '../logger';
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
function recursive(i: number) {
  setTimeout(() => {
    logger.debug(`My Itteration ${i}`);
    i++;
    if (i < 50) {
      recursive(i);
    }
  }, 5000);
}

// eslint-disable-next-line no-unused-vars
export default function (options = {}): Hook {
  return async (context: HookContext) => {
    const { method, type } = context;
    if (method === 'find' && type === 'before') {
      logger.info('Hahaha... You need this loop?');
      const i = 0;
      recursive(i);
    }
    return context;
  };
}
