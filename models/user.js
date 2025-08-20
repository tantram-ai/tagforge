const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('User', {
    uid: { type: DataTypes.STRING, unique: true }, // firebase uid
    email: { type: DataTypes.STRING },
    displayName: { type: DataTypes.STRING },
    photoURL: { type: DataTypes.STRING },
    generationCount: { type: DataTypes.INTEGER, defaultValue: 0 }, // used for free tier
    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  }, {
    tableName: 'users'
  });
};
