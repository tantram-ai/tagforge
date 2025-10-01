const { sequelize } = require('../connections');
const plans = require('./plans')(sequelize);
const generation = require('./generation')(sequelize);
const users = require('./users')(sequelize);
const subscription = require('./subscription')(sequelize);
const metaset = require('./metaset')(sequelize);
const inputs = require('./inputs')(sequelize);
const keywords = require('./keywords')(sequelize);
const projects = require('./projects')(sequelize);


// User and subscription
users.hasMany(subscription, { foreignKey: "uid" });
subscription.belongsTo(users, { foreignKey: "uid" });

// Projects and Input
projects.hasOne(inputs, { foreignKey: "projectId" });
inputs.belongsTo(projects, { foreignKey: "projectId" });

// project and keywords
projects.hasMany(keywords, { foreignKey: "projectId" });
keywords.belongsTo(projects, { foreignKey: "projectId" });

//  user and project
users.hasMany(projects, { foreignKey: "uid" });
projects.belongsTo(users, { foreignKey: "uid" });


// project and metaset
projects.hasOne(metaset, { foreignKey: "projectId" });
metaset.belongsTo(projects, { foreignKey: "projectId" })

// project and generation
projects.hasOne(generation, { foreignKey: "projectId" });
generation.belongsTo(projects, { foreignKey: 'projectId' })

// plans and Subscription 
plans.hasOne(subscription, { foreignKey: "planId" });
subscription.belongsTo(plans, { foreignKey: "planId" })

module.exports = {
  sequelize,
  users,
  projects,
  inputs,
  keywords,
  metaset,
  subscription,
  plans
};
