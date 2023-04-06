import { Server } from 'http';
import url from 'url';
import axios from 'axios';

import app from '../src/app';

const port = app.get('port') || 8998;
const getUrl = (pathname?: string) =>
  url.format({
    hostname: app.get('host') || 'localhost',
    protocol: 'http',
    port,
    pathname,
  });

describe('Feathers application tests (with jest)', () => {
  let server: Server;

  beforeAll(async () => {
    const task = app.listen(port);
    server = await task;
  });

  afterAll((done) => {
    server.close(done);
  });

  it('starts and shows the index page', async () => {
    expect.assertions(1);

    const { data } = await axios.get(getUrl());

    expect(data.indexOf('<html lang="en">')).not.toBe(-1);
  });

  it('shows a 404 JSON error without stack trace', async () => {
    expect.assertions(4);

    try {
      await axios.get(getUrl('path/to/nowhere'));
    } catch (error) {
      const { response } = error;

      expect(response.status).toBe(404);
      expect(response.data.code).toBe(404);
      expect(response.data.message).toBe('Page not found');
      expect(response.data.name).toBe('NotFound');
    }
  });
});
