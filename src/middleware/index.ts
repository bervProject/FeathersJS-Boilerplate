import { createNamespace } from 'cls-hooked';
import { Application } from '../declarations';
import correlation from './correlation';
const logNameSpace = createNamespace('logger');

export default function (app: Application): void {
  // Add your custom middleware here. Remember that
  // in Express, the order matters.
  app.use(correlation(logNameSpace));
}
