import { Application, Mux } from '@goa/core';
import * as http from 'http';

const mux = new Mux();
mux.handleFunc('/', rootHandler);
mux.handleNotFound = (_: http.IncomingMessage, resp: http.ServerResponse) => {
  resp.write('custom not found page');
  resp.end();
};

const app = new Application(mux);
app.listen(8000);

function rootHandler(_: http.IncomingMessage, resp: http.ServerResponse) {
  resp.write('root handler');
  resp.end();
}
