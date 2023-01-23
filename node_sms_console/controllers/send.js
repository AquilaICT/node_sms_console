/* import events from 'events';
import axios from 'axios'
import config from '../config.js';


const port = process.env.PORT || 8000
const app = express();
const server = createServer(app);


app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

const dlrEvent = new events.EventEmitter();

app.get('/', function(req, res) {
    res.end("Aquila API 1.0.0");
});
app.post('/api/dlr', function(req, res) {
    dlrEvent.emit("dlr_recieved", req.body);
    res.end("ACK/Jasmin")
});
app.post('/api/send', async function(req, res) {
    var msgID;
    var success = false;
    let to;
    let content;
    let jasmineRes;
    let count = 0;

    //validation
    if (!req.body.phone) {
        res.status(200).json({
            error: true,
            msg: '\'phone\' argument is required'
        })
        return
    }
    to = req.body.phone;

    if (!req.body.msg) {
        res.status(200).json({
            error: true,
            msg: '\'msg\' argument is required'
        })
        return
    }
    content = req.body.msg;

    var interval = setInterval(async function () {
        console.log("axios called for ", count, " Times");
        if (success) return;
        try {
            //request JAsmin 
            jasmineRes = await axios
                .post(`${config.JASMINE_RESTFULL_API}/send`, {
                    'to': to,
                    'from': '7071',
                    'content': content,
                    'dlr': 'yes',
                    'dlr-url': 'http://127.0.0.1:8000/api/dlr'
                }, {
                    auth: {
                        username: "bas",
                        password: "toor"
                    }
                });
            msgID = jasmineRes.data.data.substr(9);
            console.log(msgID);
            if (count > 100) {
                clearInterval(interval);
                res.status(200).json({
                    error: true,
                    msg: "failed to communicate with Jasmin."
                })
            }
            count++;
        } catch (error) {
            clearInterval(interval);
            console.error(error)
            res.status(200).json({
                error: true,
                msg: error
            })
        }
    }, 1000);
    //listen for confiramtion
    dlrEvent.on("dlr_recieved", function (confirm) {
        if (msgID != confirm.id) return;
        if ("ESME_ROK" == confirm.message_status) {
            success = true;
        }
        clearInterval(interval);
        res.status(200).json({
            error: false,
            success: success,
            msg: confirm
        })
    });
});
 */