// Initializes the `masters` service on path `/masters`
const createService = require('feathers-sequelize');
const createModel = require('../../models/masters.model');
const hooks = require('./masters.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/masters', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('masters');

  service.hooks(hooks);
};
