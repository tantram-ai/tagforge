const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('MetaSet', {
    name: DataTypes.STRING,
    metaHtml: DataTypes.TEXT
  }, { tableName: 'metasets' });
};