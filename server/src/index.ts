import * as express from 'express';
import { HttpError, Server } from 'typescript-rest';
import './controller/postsController';

let app: express.Application = express();
app.use(
  (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) => {
    response.header('Access-Control-Allow-Origin', '*');
    response.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    response.header('Access-Control-Allow-Methods', 'GET,PUT,POST');
    if ('OPTIONS' == request.method) {
      response.send(200);
    }
    else {
      next();
    }
  }
);
Server.buildServices(app);
app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    if (err instanceof HttpError) {
      res.set('Content-Type', 'application/json');
      res.status(err.statusCode);
      res.json({ data: { info: err.message, status: err.statusCode } });
    } else {
      next(err);
    }
  }
);

app.use(express.static('./public'));

Server.swagger(app, './test/data/swagger.yaml', '/api-docs', 'localhost:3000', [
  'http',
]);

app.listen(3000, function() {
  console.log('Rest Server listening on port 3000!');
});
