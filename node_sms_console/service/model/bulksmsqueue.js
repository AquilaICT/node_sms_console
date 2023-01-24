import {
  db,
} from '../db.js';

import { DataTypes } from 'sequelize';

db.define('BulkSMSQueue', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  bid: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  queueId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  jobId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  msg: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  // options
  db,
  modelName: 'BulkSMSQueue',
  tableName: 'bulk_s_m_s_queues',
  underscore: true,
});

export default db;