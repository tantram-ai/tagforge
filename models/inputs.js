const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Inputs', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    title: { type: DataTypes.STRING },
    description: { type: DataTypes.TEXT },
    url: { type: DataTypes.STRING },
    imageUrl: { type: DataTypes.STRING },
    twitterHandle: { type: DataTypes.STRING },
    language: { type: DataTypes.STRING, defaultValue: "en" },
    contentType: { type: DataTypes.STRING, defaultValue: "website" },
    aiEnabled: { type: DataTypes.BOOLEAN, defaultValue: false },
    competitorUrls: { type: DataTypes.ARRAY(DataTypes.STRING) }, // list of competitor URLs
  }, {
    tableName: 'Inputs'
  });
};



