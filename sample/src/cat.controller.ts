import * as http from 'http';

export class CatController {
  public static getIndex(_: http.IncomingMessage, resp: http.ServerResponse) {
    resp.write('cats.index');
    resp.end();
  }
}
