// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from '@feathersjs/feathers';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (options = {}): Hook => {
  return async (context: HookContext): Promise<HookContext> => {
    if (context.error) {
      console.log(context);
      const { params } = context;
      const requestId = params.requestId;
      const requestIdObject = {
        requestId,
      };
      context.error.errors = Object.assign(
        context.error.errors,
        requestIdObject,
      );
    }
    return context;
  };
};
