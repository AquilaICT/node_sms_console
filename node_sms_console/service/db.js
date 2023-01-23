import config from '../config';

const Sequelize = require('sequelize');

export const db = new Sequelize(config.dbName, config.dbUsername, config.dbPassword, {
  host: config.dbHost,
  dialect: 'mysql',
});

export async function createBulkSMSQueue(
  bid,
  status,
  phone,
  description,
  queueId,
  jobId,
  msg,
) {
  await axios.post(`${config.STORAGE_RESTFULL_API}/job/bulk/queue`, {
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
  await axios.post(`${config.STORAGE_RESTFULL_API}/job/bulk/queue/update`, {
    bid,
    status,
    phone,
    description,
    queueId,
    jobId,
    msg,
  });
}
