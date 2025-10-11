
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Plans = sequelize.define("Plans", {
    planId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0
    },
    currency: {
      type: DataTypes.STRING,
      defaultValue: "INR"
    },
    projectsLimit: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    keywordsPerProject: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    keywordSuggestionPerProject:{
      type: DataTypes.INTEGER,
      allowNull: true
    },
    aiGenerations: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    maxContentLength: {
      type: DataTypes.ENUM("short", "medium", "long"),
      defaultValue: "short"
    },
    offerDescount: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    offerTitle: {
      type: DataTypes.STRING,
      defaultValue: ""
    },
    billingCycleDiscount: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    billingCycle: {
      type: DataTypes.ENUM("monthly", "yearly"),
      defaultValue: "monthly"
    },
    features: {
      type: DataTypes.JSON,
      allowNull: true
    }
  }, { tableName: 'Plans' });

  // Insert default plans when table syncs
  Plans.addHook("afterSync", async (options) => {
    const count = await Plans.count();
    if (count === 0) {
      await Plans.bulkCreate([
        {
          name: "Free",
          price: 0,
          currency: "INR",
          projectsLimit: 1,
          keywordsPerProject: 20,
          keywordSuggestionPerProject: 2,
          aiGenerations: 2,
          maxContentLength: "short",
          offerDescount: 0,
          offerTitle: "",
          billingCycleDiscount: 0,
          billingCycle: "monthly",
          features: {
            seoContent: true,
            schemaSupport: false,
            competitorAnalysis: false,
            teamSupport: false,
          }
        },
        {
          name: "Starter",
          price: 299,
          currency: "INR",
          projectsLimit: 5,
          keywordsPerProject: 100,
          keywordSuggestionPerProject: 5,
          aiGenerations: 20,
          maxContentLength: "medium",
          offerDescount: 0,
          offerTitle: "",
          billingCycleDiscount: 0,
          billingCycle: "monthly",
          features: {
            seoContent: true,
            schemaSupport: true,
            competitorAnalysis: true,
            teamSupport: false,
          }
        },
        {
          name: "Pro",
          price: 799,
          currency: "INR",
          projectsLimit: 20,
          keywordsPerProject: 500,
          keywordSuggestionPerProject: 10,
          aiGenerations: 100,
          maxContentLength: "long",
          billingCycle: "monthly",
          offerDescount: 0,
          offerTitle: "",
          offerDescount: 0,
          offerTitle: "",
          billingCycleDiscount: 0,
          features: {
            seoContent: true,
            schemaSupport: true,
            competitorAnalysis: true,
            teamSupport: false,
          }
        },
        {
          name: "Agency",
          price: 1999,
          currency: "INR",
          projectsLimit: -1, // unlimited
          keywordsPerProject: 2000,
          keywordSuggestionPerProject: 15,
          aiGenerations: 500,
          maxContentLength: "long",
          billingCycle: "monthly",
          offerDescount: 0,
          offerTitle: "",
          billingCycleDiscount: 0,
          features: {
            seoContent: true,
            schemaSupport: true,
            competitorAnalysis: true,
            teamSupport: true,
          }
        }
      ]);
      console.log("✅ Default plans inserted!");
    }
  });

  return Plans;
};
