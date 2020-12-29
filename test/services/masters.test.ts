import app from '../../src/app';

describe("'masters' service", () => {
  it('registered the service', () => {
    const service = app.service('masters');
    expect(service).toBeTruthy();
  });
});
