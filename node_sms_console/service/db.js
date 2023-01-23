import config from '../config';

const Sequelize = require('sequelize');

export const db = new Sequelize(config.dbName, config.dbUsername, config.dbPassword, {
  host: config.dbHost,
  dialect: 'mysql',
});

try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}


export async function createBulkSMSQueue(
  bid,
  status,
  phone,
  description,
  queueId,
  jobId,
  msg,
) {
  BulkSMSQueue. {
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
