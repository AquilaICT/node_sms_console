import express from 'express';
import utils from 'util';
import colors from 'colors';
import bodyParser from 'body-parser';

import {
    createServer
} from 'http';
import send from './routes/send.js';
import sendBulk from './routes/sendbulk.js';
import sendBulkAsync from './routes/sendbulkasync.js';
import sendbulklite from './routes/sendbulklite.js';
import config from './config.js'

const app = express();
const server = createServer(app);

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.end("Aquila API 1.0.0");
    console.log("still executing!")
});

app.use('/api/send', send);
app.use('/api/sendbulklite', sendbulklite);
app.use('/api/sendbulk', sendBulk);
app.use('/api/async/sendbulk', sendBulkAsync);


server.listen(config.port, "0.0.0.0", () => {
    utils.log(
        colors.bgRed(`Server listening`),
        '@',
        colors.green(`http://localhost:${config.port}`)
    )
})

server.setTimeout(500000 * 100);