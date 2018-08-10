import * as http from 'http';

export class Mux {
  public routes: IRoute[];

  public constructor() {
    this.routes = [];
  }

  public handleFunc(path: string, callback: handlerFunc) {
    const r: IRoute = {
      handler: callback,
      path,
    };
    this.routes.push(r);
  }

  public handleNotFound(_: http.IncomingMessage, resp: http.ServerResponse): void {
    resp.write('404 not found');
    resp.statusCode = 404;
    resp.end();
  }

  public serve(req: http.IncomingMessage, resp: http.ServerResponse): void {
    const path = req.url;
    let isMatched = false;
    this.routes.forEach(route => {
      // console.log('path', path, 'route path', route.path);
      if (route.path === path) {
        isMatched = true;
        return route.handler(req, resp);
      }
    });
    if (isMatched === false) {
      this.handleNotFound(req, resp);
    }
    // const handler = this.routes[0].handler;
    // return handler(req, resp);
  }
}

type handlerFunc = (req: http.IncomingMessage, resp: http.ServerResponse) => void;

interface IRoute {
  path: string;
  handler: handlerFunc;
}
