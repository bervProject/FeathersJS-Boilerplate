const {
  softDelete,
  isProvider,
  iff
} = require('feathers-hooks-common');

const {
  authenticate
} = require('@feathersjs/authentication').hooks;

const uploadHook = require('../../hooks/upload-hook');

module.exports = {
  before: {
    all: [
      iff(
        isProvider('external'),
        authenticate('jwt')
      ),
      softDelete()
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
    all: [softDelete2()],
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
