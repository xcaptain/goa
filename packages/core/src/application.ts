import * as http from 'http';

export class Application {
  public listen(port: number) {
    const server = http.createServer(this.callback());
    return server.listen(port);
  }

  private callback() {
    const handleRequest = (_: http.IncomingMessage, resp: http.ServerResponse) => {
      // TODO: 注册容器
      resp.write('hello world');
      resp.end();
    };

    return handleRequest;
  }
}
