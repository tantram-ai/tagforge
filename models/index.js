const sequelize = require('../connections/db/sequelize');
const plans = require('./plans')(sequelize);
const generation = require('./generation')(sequelize);
const users = require('./users')(sequelize);
const subscription = require('./subscription')(sequelize);
const metaset = require('./metaset')(sequelize);
const inputs = require('./inputs')(sequelize);
const keywords = require('./keywords')(sequelize);
const projects = require('./projects')(sequelize);


// User

users.hasMany(models.Projects, { foreignKey: "userId" });
users.hasOne(models.Subscription,{ foreignKey: "id" });

// Projects 

projects.belongsTo(models.Users, { foreignKey: "userId" });
projects.hasOne(models.Inputs, { foreignKey: "projectId" });
projects.hasOne(models.MetaSet, { foreignKey: "projectId" });
projects.hasMany(models.Keywords, { foreignKey: "projectId" });
projects.hasMany(models.Generation, { foreignKey: "projectId" });

// Plans 

plans.hasMany(models.Subscription, { foreignKey: "planId" });

// Inputs

inputs.belongsTo(models.Projects, { foreignKey: "id" });

// Keywords

keywords.belongsTo(models.Projects, { foreignKey: "id" });

// Subscription
subscription.belongsTo(models.Users,{foreignKey:"id"});
subscription.belongsTo(models.Plans,{foreignKey:"id"})

// metaSet
metaset.belongsTo(models.MetaSet,{foreignKey:"id"})

// Generation

generation.belongsTo(models.Projects,{foreignKey:'id'})




module.exports = {
  sequelize,
  users,
  projects,
  inputs,
  keywords,
  metaset,
  subscription
};
