const masters = require('./masters/masters.service.js');
const upload = require('./upload/upload.service.js');
const users = require('./users/users.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(masters);
  app.configure(upload);
  app.configure(users);
};
