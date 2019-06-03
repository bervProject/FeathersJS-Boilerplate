const {
  softDelete2
} = require('feathers-hooks-common');

const masterHook = require('../../hooks/master-hook');

module.exports = {
  before: {
    all: [],
    find: [
      masterHook(),
      softDelete2()
    ],
    get: [
      masterHook(),
      softDelete2()
    ],
    create: [softDelete2()],
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
