import config from '../config.js';

import Sequelize from 'sequelize';

export const db = new Sequelize(config.dbName, config.dbUsername, config.dbPassword, {
  host: config.dbHost,
  dialect: 'mysql',
 
});

export const setup = async () => {
  try {
    await db.authenticate();
    console.log('Connection has been established successfully.');
    
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};
