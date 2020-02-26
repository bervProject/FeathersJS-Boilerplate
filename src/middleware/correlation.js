const { v4: uuidv4 } = require('uuid');

function correlation(namespace) {
  return (req, res, next) => {
    const correlationId = uuidv4();
    req.feathers.correlationId = correlationId;
    namespace.run(() => {
      namespace.set('correlationId', correlationId);
      next();
    });
  };
}

module.exports = correlation;
