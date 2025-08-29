const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Keywords', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    phrase: { type: DataTypes.STRING, allowNull: false },
    searchVolume: { type: DataTypes.INTEGER },
    cpc: { type: DataTypes.FLOAT },
    competition: { type: DataTypes.FLOAT },
    selected: { type: DataTypes.BOOLEAN, defaultValue: false }
  }, {
    tableName: 'Keywords'
  });
};



