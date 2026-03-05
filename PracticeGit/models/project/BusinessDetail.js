const { DataTypes } = require('sequelize');
const { projectDB } = require('../../config/db'); // Import specific DB instance

const BusinessDetail = projectDB.define('BusinessDetail', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  centralId: { 
    type: DataTypes.INTEGER, 
    allowNull: false,
    comment: 'Reference to ID in Central DB' 
  },
  address: {
    type: DataTypes.STRING
  },
  taxNumber: {
    type: DataTypes.STRING
  },
  website: {
    type: DataTypes.STRING
  }
}, {
  tableName: 'business_details'
});

module.exports = BusinessDetail;