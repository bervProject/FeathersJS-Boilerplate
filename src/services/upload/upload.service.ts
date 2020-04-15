// Initializes the `upload` service on path `/upload`
import { ServiceAddons } from '@feathersjs/feathers';
import * as express from 'express';
import multer from 'multer';
import { Application } from '../../declarations';
import { Upload } from './upload.class';
import createModel from '../../models/upload.model';
import hooks from './upload.hooks';

const multipartMiddleware = multer();

declare module '../../declarations' {
  interface ServiceTypes {
    'upload': Upload & ServiceAddons<any>;
  }
}

export default function (app: Application) {
  const bucketName = app.get('bucketName');

  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/upload', multipartMiddleware.single('file'),
    function (req: any, res: any, next: any) {
      if (!req.feathers) {
        req.feathers = {};
      }
      req.feathers.file = req.file;
      req.feathers.bucketName = bucketName;
      next();
    },
    new Upload(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('upload');

  service.hooks(hooks);
};
