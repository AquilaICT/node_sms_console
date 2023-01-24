import BulkSMSQueue from './model/bulksmsqueue.js';

export async function createBulkSMSQueue(
  bid,
  status,
  phone,
  description,
  queueId,
  jobId,
  msg,
) {
  BulkSMSQueue.create({
    bid,
    status,
    phone,
    description,
    queueId,
    jobId,
    msg,
  });
}

export async function updateBulkSMSQueue(
  bid,
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
    where: { queueId, phone, msg },
  });
}
