const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Generation', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    seoContent:{ type: DataTypes.JSONB},
    metaHtml: DataTypes.TEXT,
    data: { type: DataTypes.JSONB },
  }, { tableName: 'Generation' });
};
