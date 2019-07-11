import * as http from 'http';
import { Route } from './route';
import { handlerFunc } from './types';
export class Mux {
  public routes: Route[];

  public constructor() {
    this.routes = [];
  }

  public handleFunc(path: string, callback: handlerFunc) {
    const route = new Route(path, callback);
    this.routes.push(route);
    return route;
  }

  public handleNotFound(_: http.IncomingMessage, resp: http.ServerResponse): void {
    resp.write('404 not found');
    resp.statusCode = 404;
    resp.end();
  }

  public serve(req: http.IncomingMessage, resp: http.ServerResponse): void {
    let isMatched = false;
    this.routes.forEach(route => {
      if (route.match(req)) {
        isMatched = true;
        route.handler(req, resp);
      }
    });
    if (isMatched === false) {
      this.handleNotFound(req, resp);
    }
  }
}
