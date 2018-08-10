import * as http from 'http';
import { Mux } from './mux';

export class Application {
  private mux: Mux; // must be global singleton

  public constructor(mux: Mux) {
    this.mux = mux;
  }

  public listen(port: number) {
    const server = http.createServer(this.callback());
    return server.listen(port);
  }

  private callback() {
    const handleRequest = (req: http.IncomingMessage, resp: http.ServerResponse) => {
      this.mux.serve(req, resp);
    };

    return handleRequest;
  }
}
