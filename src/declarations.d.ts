import { Sequelize } from 'sequelize';
import '@feathersjs/transport-commons';
import { Application as ExpressFeathers } from '@feathersjs/express';
import { HookContext as FeathersHookContext } from '@feathersjs/feathers';

export interface Configuration {
  // Put types for app.get and app.set here
  port: number;
  host: string;
  postgres: string;
  sequelizeClient: Sequelize;
  public: string;
  bucketName: string;
  paginate: {
    default: number;
    max: number;
  };
}
// A mapping of service names to types. Will be extended in service files.
/* eslint-disable-next-line @typescript-eslint/no-empty-object-type */
export interface ServiceTypes {}
// The application instance type that will be used everywhere else
export type Application = ExpressFeathers<ServiceTypes, Configuration>;
export type HookContext = FeathersHookContext<Application>;
