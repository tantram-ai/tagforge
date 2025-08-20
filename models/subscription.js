const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Subscription', {
    stripeCustomerId: DataTypes.STRING,
    stripeSubscriptionId: DataTypes.STRING,
    status: DataTypes.STRING,
    plan: DataTypes.STRING,
    currentPeriodEnd: DataTypes.DATE
  }, { tableName: 'subscriptions' });
};
