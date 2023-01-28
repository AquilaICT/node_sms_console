import config from '../config.js';
import axios from 'axios';

export async function sendBulk(
    requestObj,
    usr,
    pwd,
    from,
    bid
) {
    let data = {};

    data.messages = requestObj;

    data.batch_config = {
        callback_url: `http://host.docker.internal:${config.port}/api/sendbulk/success/${bid}`,
        errback_url: `http://host.docker.internal:${config.port}/api/sendbulk/error/${bid}`
    }

    data.globals = {
        from: from,
    }

    console.log(" data ", data);
    try {
        //request Jasmine 
        const jasmineRes = await axios
            .post(`${config.JASMINE_RESTFULL_API}/sendbatch`, JSON.stringify(data), {
                headers: {
                    'Content-Type': 'application/json'
                },
                auth: {
                    username: usr,
                    password: pwd
                }
            });
        let batchId = jasmineRes.data.data.batchId;

        console.log(batchId);
        return batchId;

    } catch (error) {
        console.log(error);
        console.log(error.response.headers);
        console.log(error.response.data);
        console.log(error.response.status);
        console.table({
            error: true,
            msg: error
        })
    }
}

export function buildRequestObj(to, content) {
    return [{
        to: to,
        content: content
    }]
}