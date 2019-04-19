const masters = require('./masters/masters.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(masters);
};
