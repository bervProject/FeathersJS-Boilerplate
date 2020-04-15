// Initializes the `masters` service on path `/masters`
import { Application } from '../../declarations';
import { ServiceAddons } from '@feathersjs/feathers';
import createModel from '../../models/masters.model';
import hooks from './masters.hooks';
import { Masters } from './masters.class';

declare module '../../declarations' {
  interface ServiceTypes {
    'masters': Masters & ServiceAddons<any>;
  }
}

export default function (app: Application) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/masters', new Masters(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('masters');

  service.hooks(hooks);
};
