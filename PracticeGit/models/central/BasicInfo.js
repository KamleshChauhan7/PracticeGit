const { DataTypes } = require('sequelize');
const { centralDB } = require('../../config/db'); // Import specific DB instance

const BasicInfo = centralDB.define('BasicInfo', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  businessName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  businessEmail: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  businessPhone: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'business_basic_info'
});

module.exports = BasicInfo;