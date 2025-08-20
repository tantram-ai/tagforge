const Sequelize = require('sequelize');
const sequelize = require('../connections/db/sequelize');

const User = require('./user')(sequelize);
const Generation = require('./generation')(sequelize);
const MetaSet = require('./metaset')(sequelize);
const Subscription = require('./subscription')(sequelize);

// Associations
User.hasMany(Generation);
Generation.belongsTo(User);

User.hasMany(MetaSet);
MetaSet.belongsTo(User);

User.hasOne(Subscription);
Subscription.belongsTo(User);

module.exports = {
  sequelize,
  User,
  Generation,
  MetaSet,
  Subscription
};
