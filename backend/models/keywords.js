const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Keywords', {
    keywordId:  {type: DataTypes.INTEGER,primaryKey: true,autoIncrement: true},
    projectId:{type: DataTypes.UUID},
    phrase:{ type: DataTypes.JSONB},
    // searchVolume: { type: DataTypes.INTEGER },
    // cpc: { type: DataTypes.FLOAT },
    // competition: { type: DataTypes.FLOAT },
    selected: { type: DataTypes.BOOLEAN, defaultValue: false },
    suggested: { type: DataTypes.BOOLEAN, defaultValue: false }
  }, {
    tableName: 'Keywords'
  });
};



