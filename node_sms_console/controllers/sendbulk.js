import axios from 'axios'
import config from '../config.js';
import {
    execSync
} from "child_process";
import pathToChecker from '../env.js';
import * as bulkSMSService from '../service/bulksmsqueue.service.js';


export async function errorBatch(req, res) {
    console.log("logged errorBatch");
    await delay(1000)
    try {
        let confirm = req.query;
        count[confirm.batchId].data.count++;
        let currentCount = count[confirm.batchId].data.count;

        if (confirm.status != 1) {
            count[confirm.batchId].data.result.push({
                status: "failed",
                bid: req.params.bid,
                msgID: "error",
                phone: confirm.to,
                description: confirm.statusText,
                batchId: confirm.batchId,
            });
            await axios.post(`${config.GEEZ_RESTFULL_API}/sms/down/notify`, {
                error: true,
                msgID: confirm.statusText,
                bid: req.params.bid,
                content: confirm.batchId
            });
            return res.end("ACK/Jasmin")
        }
        let msgID = confirm.statusText.substr(9).slice(0, -1);
        let output = execSync(`python3 ${pathToChecker}check.py -i ${msgID}`);
        output = JSON.parse(output);
        count[confirm.batchId].data.result.push({
            queueId: msgID,
            bid: req.params.bid,
            status: (output.found && output.success) ? "success" : "failed",
            phone: confirm.to,
            description: confirm.statusText,
            content: confirm.batchId
        });
        if (output.down)
            await axios.post(`${config.GEEZ_RESTFULL_API}/sms/down/notify`, {
                error: true,
                queueId: msgID,
                bid: req.params.bid,
                phone: confirm.to,
                description: confirm.statusText,
                content: confirm.batchId
            });
        if (count[confirm.batchId].data.messageCount <= currentCount) {
            count[confirm.batchId].res.status(200).json({
                error: false,
                batch: confirm.batchId,
                bid: req.params.bid,
                outcome: count[confirm.batchId].data
            })
            delete count[confirm.batchId]
        }
        res.end("ACK/Jasmin")

    } catch (error) {
        console.log(error);
        console.log(error.response.headers);
        console.log(error.response.data);
        console.log(error.response.status);
        res.status(200).json({
            error: true,
            msg: error
        })
    }
}

export async function successfulBatch(req, res) {
    console.log("logged successfulBatch");
    await delay(1000)
    try {
        let confirm = req.query;
        let batchId = confirm.batchId;

        console.log(req.params.bid);

        let msgID = confirm.statusText.substr(9).slice(0, -1);
        console.log(msgID);

        let output = execSync(`python3 ${pathToChecker}check.py -i ${msgID}`);
        output = JSON.parse(output);
        console.log("output:- ", output);
        //TODO: currently only support static msg
        await bulkSMSService.updateBulkSMSQueue({
            queueId: msgID,
            batchId: batchId,
            msg: config.msg,
            bid: req.params.bid,
            phone: confirm.to,
            status: (output.found && output.success) ? "success" : "failed",
            description: confirm.statusText,
            content: confirm.batchId
        });

        if (output.down)
            console.log('Error Occured', {
                error: true,
                queueId: msgID,
                bid: req.params.bid,
                description: confirm.statusText,
                phone: confirm.to,
                content: confirm.batchId
            });
        res.end("ACK/Jasmin")

    } catch (error) {
        console.log(error);
        console.log(error.response.headers);
        console.log(error.response.data);
        console.log(error.response.status);
        res.status(200).json({
            error: true,
            msg: error
        })
    }
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))