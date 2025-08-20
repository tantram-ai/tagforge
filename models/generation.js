const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Generation', {
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    url: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
    twitterHandle: DataTypes.STRING,
    schemaJson: DataTypes.JSONB,
    usedModel: DataTypes.STRING,
    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
  }, { tableName: 'generations' });
};
