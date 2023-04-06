import { SequelizeService, SequelizeAdapterOptions } from 'feathers-sequelize';
import { Application } from '../../declarations';

export class Masters extends SequelizeService {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(options: SequelizeAdapterOptions, app: Application) {
    super(options);
  }
}
