import {
  BulkSMSQueue
} from './model/bulksmsqueue.js'

export async function createBulkSMSQueue({
  bid,
  batchId,
  status,
  phone,
  description,

  jobId,
  msg,
} = {}) {
  await BulkSMSQueue.create({
    bid,
    status,
    phone,
    description,
    queueId: batchId,
    jobId,
    msg,
  });
}

export async function updateBulkSMSQueue(
  bid,
  batchId,
  status,
  phone,
  description,
  queueId,
  jobId,
  msg,
) {
  await BulkSMSQueue.update({
    bid,
    status,
    description,
    jobId,
    msg,
  }, {
    where: {
      queueId: batchId,
      phone,
      msg
    },
  });
}