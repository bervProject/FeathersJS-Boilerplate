const uuidv4 = require('uuid/v4');

function correlation(namespace) {
  return (req, res, next) => {
    const correlationId = uuidv4();
    req.feathers.correlationId = correlationId;
    namespace.run(() => {
      namespace.set('correlationId', correlationId);
      next();
    });
  }
}

module.exports = correlation;
