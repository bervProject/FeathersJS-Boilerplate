const {
  softDelete2,
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
        authenticate('jwt'))
    ],
    find: [softDelete2()],
    get: [softDelete2()],
    create: [uploadHook(), softDelete2()],
    update: [softDelete2()],
    patch: [softDelete2()],
    remove: [softDelete2()]
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
