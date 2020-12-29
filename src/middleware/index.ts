import { createNamespace } from 'cls-hooked';
import { Application } from '../declarations';
import correlation from './correlation';
const logNameSpace = createNamespace('logger');

// eslint-disable-next-line no-unused-vars
export default function (app: Application) {
  // Add your custom middleware here. Remember that
  // in Express, the order matters.
  app.use(correlation(logNameSpace));
}
