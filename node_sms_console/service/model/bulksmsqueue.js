const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FooBar extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  FooBar.init(
    {
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
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      jobId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      msg: {
         type: DataTypes.STRING, 
         allowNull: false, 
      },
    },
    {
      // options
      sequelize,
      modelName: 'BulkSMSQueue',
      tableName: 'bulk_s_m_s_queues',
      underscore: true,
    },
  );
  return FooBar;
};