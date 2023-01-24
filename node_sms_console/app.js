import express from 'express';
import utils from 'util';
import colors from 'colors';
import bodyParser from 'body-parser';

import {
  createServer,
} from 'http';
import sendBulk from './routes/sendbulk.js';
import config from './config.js';
import * as db from './service/db.js';

const app = express();
const server = createServer(app);

db.setup();

app.use(bodyParser.urlencoded({
  extended: false,
}));

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.end('Aquila API 1.0.0');
  console.log('still executing!');
});

app.use('/api/sendbulk', sendBulk);

server.listen(config.port, '0.0.0.0', () => {
  utils.log(
    colors.bgRed('Server listening'),
    '@',
    colors.green(`http://localhost:${config.port}`),
  );
});

server.setTimeout(500000 * 100);
