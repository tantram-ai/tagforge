const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Projects', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    status: { type: DataTypes.ENUM("draft", "completed"), defaultValue: "draft" }
  }, {
    tableName: 'Projects'
  });
};
