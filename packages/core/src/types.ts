import * as http from 'http';

export type handlerFunc = (req: http.IncomingMessage, resp: http.ServerResponse) => void;
