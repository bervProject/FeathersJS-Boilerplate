const createNameSpace = require('cls-hooked').createNamespace;
const correlation = require('./correlation');
const logNameSpace = createNameSpace('logger');

// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  // Add your custom middleware here. Remember that
  // in Express, the order matters.
  app.use(correlation(logNameSpace));
};
