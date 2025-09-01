const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Generation', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    projectId:{type: DataTypes.UUID, unique: true},
    seoContent:{ type: DataTypes.JSONB},
    metaHtml: {type:DataTypes.TEXT},
    data: { type: DataTypes.JSONB },
  }, { tableName: 'Generation' });
};
