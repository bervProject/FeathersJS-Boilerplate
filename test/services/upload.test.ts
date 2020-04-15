import app from '../../src/app';

describe('\'upload\' service', () => {
  it('registered the service', () => {
    const service = app.service('upload');
    expect(service).toBeTruthy();
  });
});
