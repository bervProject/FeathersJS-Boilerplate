import {
  softDelete,
  isProvider,
  iff
} from 'feathers-hooks-common';
import uploadHook from '../../hooks/upload-hook';
import * as feathersAuthentication from '@feathersjs/authentication';
const { authenticate } = feathersAuthentication.hooks;

export default {
  before: {
    all: [
      iff(
        isProvider('external'),
        authenticate('jwt')
      ),
      softDelete({
        // context is the normal hook context
        deletedQuery: async context => {
          return { deletedAt: null };
        },
        removeData: async context => {
          return { deletedAt: new Date() };
        }
      })
    ],
    find: [],
    get: [],
    create: [
      uploadHook()
    ],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
