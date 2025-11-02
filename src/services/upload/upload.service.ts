// Initializes the `upload` service on path `/upload`
import multer from 'multer';
import { Application } from '../../declarations';
import { Upload } from './upload.class';
import createModel from '../../models/upload.model';
import hooks from './upload.hooks';

const multipartMiddleware = multer();

declare module '../../declarations' {
  interface ServiceTypes {
    upload: Upload;
  }
}

export default function (app: Application): void {
  const bucketName = app.get('bucketName');

  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
  };

  // @ts-expect-error different type
  app.use(
    'upload',
    multipartMiddleware.single('file'),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function (req: any, res: any, next: any) {
      if (!req.feathers) {
        req.feathers = {};
      }
      req.feathers.file = req.file;
      req.feathers.bucketName = bucketName;
      next();
    },
    new Upload(options, app),
  );

  // Get our initialized service so that we can register hooks
  const service = app.service('upload');

  service.hooks(hooks);
}
