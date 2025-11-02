import { Params } from '@feathersjs/feathers';
import {
  AuthenticationService,
  JWTStrategy,
  AuthenticationResult,
} from '@feathersjs/authentication';
import { LocalStrategy } from '@feathersjs/authentication-local';
import { oauth } from '@feathersjs/authentication-oauth';

import { Application } from './declarations';

declare module './declarations' {
  interface ServiceTypes {
     
    authentication: AuthenticationService;
  }
}

class MyAuthenticationService extends AuthenticationService {
  async getPayload(authResult: AuthenticationResult, params: Params) {
    // Call original `getPayload` first
    const payload = await super.getPayload(authResult, params);
    const { user } = authResult;

    return Object.assign(payload, {
      userId: user.id,
      role: user.role,
      roles: user.role,
    });
  }
}

export default function (app: Application): void {
  const authentication = new MyAuthenticationService(app);

  authentication.register('jwt', new JWTStrategy());
  authentication.register('local', new LocalStrategy());

  app.use('authentication', authentication);
  app.configure(oauth());
}
