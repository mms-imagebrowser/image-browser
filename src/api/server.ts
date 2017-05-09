import * as express from 'express';
import {Request, Response} from 'express';
import * as bodyParser from 'body-parser';

namespace express_api {
  // Initialize express and set port number
  const app = express();
  const port = 3000;

  // Plug in body parser middleware for posting JSON
  app.use(bodyParser.json());

  // Handle GET for the root URL
  app.get('/api/', (req: Request, resp: Response) => {
    resp.send('Hello Express!');
  });

  // Start the web app
  app.listen(port, () => console.log(`Express app listening on port ${port}`));
}
