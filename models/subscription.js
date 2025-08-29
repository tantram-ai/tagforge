const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Subscription', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    planId:DataTypes.INTEGER,
    stripeCustomerId: DataTypes.STRING,
    stripeSubscriptionId: DataTypes.STRING,
    status: {type: DataTypes.ENUM("active", "inactive", "canceled", "expired"),defaultValue: "inactive",},
    plan: DataTypes.STRING,
    CurrentPeriodStart:DataTypes.DATE,
    currentPeriodEnd: DataTypes.DATE
  }, { tableName: 'Subscription' });
};
