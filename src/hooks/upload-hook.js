// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const uuid = require('uuid/v4');
const mime = require('mime-types');
const Storage = require('@google-cloud/storage').Storage;

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    const { app } = context;
    return new Promise((resolve, reject) => {
      const file = context.params.file;
      if (!file) {
        reject('File not found');
      }
      app.debug(file);

      const type = mime.lookup(file.originalname);

      const storage = new Storage({
        keyFilename: 'src/credentials/google.json',
      });

      const bucket = storage.bucket(context.app.get('bucketName'));
      const blob = bucket.file(`${uuid()}.${mime.extensions[type][0]}`);

      const stream = blob.createWriteStream({
        resumable: true,
        contentType: type,
        predefinedAcl: 'publicRead',
      });

      stream.on('error', err => {
        app.error('Error Upload');
        app.error(err);
        reject(err);
      });

      stream.on('finish', () => {
        app.info('finish upload');
        context.data.url = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
        resolve(context);
      });

      stream.end(file.buffer);
    });
  };
};
