import * as http from 'http';
import * as url from 'url';

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
    const urlString = req.url === undefined ? '' : req.url;
    const parsedUrl = url.parse(urlString, true);
    let isMatched = false;
    this.routes.forEach(route => {
      if (route.path === parsedUrl.pathname) {
        isMatched = true;
        return route.handler(req, resp);
      }
    });
    if (isMatched === false) {
      this.handleNotFound(req, resp);
    }
  }
}

type handlerFunc = (req: http.IncomingMessage, resp: http.ServerResponse) => void;

interface IRoute {
  path: string;
  handler: handlerFunc;
}
