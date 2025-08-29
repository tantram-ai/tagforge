const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('MetaSet', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    name: DataTypes.STRING,
    metaHtml: DataTypes.TEXT
  }, { tableName: 'MetaSet' });
};