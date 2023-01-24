/* eslint-disable no-mixed-operators */
/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
import {
    setTimeout
} from 'timers/promises';
import config  from '../config.js';

import {
    sendBulk,
    buildRequestObj
} from '../service/sms.js';

import * as bulkSMSService from '../service/bulksmsqueue.service.js';
import {
    getByGroup
} from '../service/contact.js';

let contacts = [];

let total = 0;
let progress = config.progress;
let loading = true;
let done = false;
const chunck = 5;

function sendSMS() {
    console.time('sendSMS');

    getByGroup(config.group_id, config.user_id)
        .then((data) => {
            console.log(data);

            contacts = data.data.data;
            total = contacts.length;
            loading = true;
            done = false;

            console.log(`total of ${total} contacts fetched`);
            send(contacts, progress);
        }).catch((error) => {
            console.log('error', error);
        });
}

async function send(contacts, index) {
    try {
        console.log('index', index);
        const phones = contacts.slice(index, Math.min(index + chunck, total + 1));
        console.log('phones: ', phones.length);

        const batchId = sendBulk(buildRequestObj(phones, config.msg), config.usr, config.pwd, config.from);
        console.log('batchId', batchId);
        // eslint-disable-next-line no-restricted-syntax
        for (const phone of phones) {
            // eslint-disable-next-line no-await-in-loop
            await bulkSMSService.createBulkSMSQueue({
                queueId: 'msgID',
                batchId,
                bid: index,
                phone,
                status: 'trying',
                description: '',
                content: config.msg,
            });
        }

        index = Math.min(index + chunck, total);
        progress = index;

        console.log(`progress ${progress}/${total} -- ${progress / total * 100}`);
        if (index < total) return send(contacts, index);

        console.timeEnd('sendSMS');
        console.log({
            loading: false,
            done: true,
            success: true,
        });
    } catch (error) {
        console.log(error);
        console.log(error.response);
        console.log(`[retrying] progress ${progress}/${total} -- ${progress / total * 100}`);
        setTimeout(500).then(() => {
            send(contacts, index);
        });
    }
}

sendSMS();