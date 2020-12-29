// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { v4 as uuid } from 'uuid';
import mime from 'mime-types';
import { Storage } from '@google-cloud/storage';
import { HookContext, Hook } from '@feathersjs/feathers';
import logger from '../logger';

// eslint-disable-next-line no-unused-vars
export default function (options = {}): Hook {
  return async (context: HookContext) => {
    const { app, method, type } = context;
    if (method === 'create' && type === 'after') {
      const promise = new Promise<HookContext>((resolve, reject) => {
        const { params } = context;
        if (!params) {
          reject("Params Can't Null");
          return;
        }
        const file = params.file;
        if (!file) {
          reject('File not found');
          return;
        }
        logger.debug(file);

        const type = mime.lookup(file.originalname);
        if (!type) {
          reject("Can't find mime-type");
          return;
        }

        const storage = new Storage({
          keyFilename: 'src/credentials/google.json',
        });

        const bucket = storage.bucket(app.get('bucketName'));
        const blob = bucket.file(`${uuid()}.${mime.extensions[type][0]}`);

        const stream = blob.createWriteStream({
          resumable: true,
          contentType: type,
          predefinedAcl: 'publicRead',
        });

        stream.on('error', (err) => {
          logger.error('Error Upload');
          logger.error(err);
          reject(err);
        });

        stream.on('finish', () => {
          logger.info('finish upload');
          context.data.url = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
          resolve(context);
        });

        stream.end(file.buffer);
      });
      return await promise;
    } else {
      return context;
    }
  };
}
