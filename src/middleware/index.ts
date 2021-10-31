import { createNamespace } from 'cls-hooked';
import { Application } from '../declarations';
import correlation from './correlation';
import requestId from './request-id';
const logNameSpace = createNamespace('logger');

export default function (app: Application): void {
  // Add your custom middleware here. Remember that
  // in Express, the order matters.
  app.use(correlation(logNameSpace));
  app.use(requestId());
}
