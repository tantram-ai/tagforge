const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('MetaSet', {
    id:  {type: DataTypes.INTEGER,primaryKey: true,autoIncrement: true},
    projectId:{type: DataTypes.UUID, unique:true},
    name: DataTypes.STRING,
    metaHtml: DataTypes.TEXT
  }, { tableName: 'MetaSet' });
};