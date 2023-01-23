const envConfig = require('../config')

const SMS = require('../service/sms')

const Db = require('../service/db')

const Contact = require('../service/contact');

const {
    setTimeout
} = require('timers/promises');

let contacts = []

let total = 0
let progress = envConfig.progress
let loading = true
let done = false
let chunck = 5;

function sendSMS() {
    console.time("sendSMS");

    Contact.getByGroup(envConfig.group_id, envConfig.user_id)
        .then((data) => {
            console.log(data)

            contacts = data.data.data
            total = contacts.length
            loading = true
            done = false

            console.log(`total of ${total} contacts fetched`)
            send(contacts, progress)
        }).catch(function (error) {
            console.log("error", error)
        })
}

async function send(contacts, index) {
    try {
        console.log('index', index)
        let phones = contacts.slice(index, Math.min(index + chunck, total + 1));
        console.log('phones: ', phones.length)

        let batchId = SMS.sendBulk(SMS.buildRequestObj(phones, envConfig.msg), envConfig.use, envConfig.pwd, envConfig.from);
        console.log("batchId", batchId);

    
        Db.createBulkSMSQueue({
            queueId: msgID,
            batchId: batchId,
            bid: ,
            phone: confirm.to,
            status: (output.found && output.success) ? "success" : "failed",
            description: confirm.statusText,
            content: confirm.batchId
        });

        index = Math.min(index + chunck, total)
        progress = index

        console.log(`progress ${progress}/${total} -- ${progress/total * 100}`);
        if (index < total) return send(contacts, index)

        console.timeEnd("sendSMS")
        console.log({
            loading: false,
            done: true,
            success: true
        })
    } catch (error) {
        console.log(error)
        console.log(error.response)
        console.log(`[retrying] progress ${progress}/${total} -- ${progress/total * 100}`);
        setTimeout(500).then(() => {
            send(contacts, index)
        })
    }
}

sendSMS()