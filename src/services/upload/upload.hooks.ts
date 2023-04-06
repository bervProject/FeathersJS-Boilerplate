import { softDelete, isProvider, iff } from 'feathers-hooks-common';
import { uploadHook } from '@bervproject/feathers-advance-hook';
import * as feathersAuthentication from '@feathersjs/authentication';
import { HookContext } from '../../declarations';
const { authenticate } = feathersAuthentication.hooks;

export default {
  before: {
    all: [
      iff(isProvider('external'), authenticate('jwt')),
      softDelete({
        // context is the normal hook context
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        deletedQuery: async (context: HookContext) => {
          return { deletedAt: null };
        },
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        removeData: async (context: HookContext) => {
          return { deletedAt: new Date() };
        },
      }),
    ],
    find: [],
    get: [],
    create: [uploadHook()],
    update: [],
    patch: [],
    remove: [],
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
};
