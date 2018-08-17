import * as http from 'http';
import * as url from 'url';
import { handlerFunc } from './types';

export class Route {
  public path: string;

  public handler: handlerFunc;

  public method: string;

  public constructor(path: string, handler: handlerFunc) {
    this.path = path;
    this.handler = handler;
    this.method = 'GET';
  }

  public setMethod(name: 'GET' | 'POST' | 'DELETE' | 'PATCH' | 'PUT' | 'HEAD') {
    this.method = name;
  }

  public match(req: http.IncomingMessage): boolean {
    const urlString = req.url === undefined ? '' : req.url;
    if (req.method === undefined) {
      return false;
    }
    const parsedUrl = url.parse(urlString, true);
    if (parsedUrl.pathname === urlString) {
      return true;
    }
    // should return 405 method not allowed, but for now just use 404
    if (this.method !== req.method.toUpperCase()) {
      return false;
    }
    return true;
  }
}
