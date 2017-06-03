import * as express from 'express';
import {Request, Response} from 'express';
import {PluginService} from './plugin-service';
import * as bodyParser from 'body-parser';
import {FileService} from './file-service';

namespace express_api {
  const path = './plugins'; // TODO: external config
  // Initialize express and set port number
  const app = express();
  const port = 3000;
  const pluginService = new PluginService(path);
  const fileSystemService = new FileService();

  // Plug in body parser middleware for posting JSON
  app.use(bodyParser.json());

  // Handle GET for the root URL
  app.get('/api/', (req: Request, resp: Response) => {
    resp.send('Hello Express!');
  });

  app.get('/api/plugins/', (req: Request, resp: Response) => {
    resp.header('Access-Control-Allow-Origin', '*');
    resp.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    console.log('get /plugins');
    pluginService.list(plugins => {
      resp.send(plugins);
    });
  });

  app.post('/api/plugins/', (req: Request, resp: Response) => {
    if (!req.body) {
      resp.status(400);
      resp.send('');
    }
    pluginService.createOrUpdate(req.body, success => {
      resp.status(success ? 201 : 500);
      resp.send('');
    });
  });

  app.get('/api/plugins/:name', (req: Request, resp: Response) => {
    resp.header('Access-Control-Allow-Origin', '*');
    resp.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    pluginService.load(req.params.name, plugin => {
      if (plugin) {
        resp.send(plugin);
      } else {
        resp.status(404);
        resp.send('');
      }
    });
  });

  app.delete('/api/plugins/:name', (req: Request, resp: Response) => {
    console.log(req.params);
    pluginService.delete(req.params.name, success => {
      resp.status(success ? 200 : 500);
      resp.send('');
    });
  });

  app.post('/api/plugins/:name/execute', (req: Request, resp: Response) => {
    console.log('Executing plugin ' + req.params.name);
    pluginService.execute(req.params.name, req.query.action, req.body, req.query.imgPath, result => {
      if (!result) {
        resp.status(500);
        resp.send();
        console.log('Plugin execution failed');
      } else {
        resp.send(result);
      }
    });
  });

  app.get('/api/filesystem/list/', (req: Request, resp: Response) => {
    fileSystemService.list(req.query.path, files => {
      if (files) {
        resp.send(files);
      }
    });
  });
  // Start the web app
  app.listen(port, () => console.log(`Express app listening on port ${port}`));
}
