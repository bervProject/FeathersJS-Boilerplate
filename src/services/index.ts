import { Application } from '../declarations';
import masters from './masters/masters.service';
import upload from './upload/upload.service';
import users from './users/users.service';

export default function (app: Application) {
  app.configure(masters);
  app.configure(upload);
  app.configure(users);
};
