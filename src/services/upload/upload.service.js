// Initializes the `upload` service on path `/upload`
const multer = require('multer');
const multipartMiddleware = multer();
const createService = require('feathers-sequelize');
const createModel = require('../../models/upload.model');
const hooks = require('./upload.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');
  const bucketName = app.get('bucketName');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/upload', multipartMiddleware.single('file'),
    function (req, res, next) {
      req.feathers.file = req.file;
      req.feathers.bucketName = bucketName;
      next();
    },
    createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('upload');

  service.hooks(hooks);
};
