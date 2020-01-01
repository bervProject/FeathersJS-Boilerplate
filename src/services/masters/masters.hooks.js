const {
  softDelete
} = require('feathers-hooks-common');

const masterHook = require('../../hooks/master-hook');

module.exports = {
  before: {
    all: [
      softDelete()
    ],
    find: [
      masterHook()
    ],
    get: [
      masterHook()
    ],
    create: [],
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
