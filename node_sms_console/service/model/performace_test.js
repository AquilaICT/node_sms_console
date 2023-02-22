import {
  db,
} from '../db.js';

import {
  DataTypes
} from 'sequelize';

export const PerformanceTest =
  db.define('performance_test', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    number: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    // options

    db,
    modelName: 'PerformanceTest',
    tableName: 'performance_test',
    createdAt: 'created_at',
    updatedAt: 'updated_at',

  });