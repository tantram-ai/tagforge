const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Inputs', {
    inputId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    projectId: { type: DataTypes.UUID, unique: true, primaryKey: true },
    businessBrief: {
      type: DataTypes.TEXT,
      allowNull: false,
      // comment: "Explains the business: what it does, vision, offerings, and target audience",
    },
    brandName: {
      type: DataTypes.STRING,
      allowNull: false,
      // comment: "Main topic/keyword for content",
    },
    pageType: {
      type: DataTypes.ENUM("blog", "landing", "product", "service", "faq"),
      allowNull: false,
      // comment: "Page type to generate content for",
    },
    tone: {
      type: DataTypes.ENUM(
        "professional",
        "friendly",
        "conversational",
        "persuasive",
        "storytelling"
      ),
      allowNull: false,
    },
    length: {
      type: DataTypes.ENUM("short", "medium", "long"),
      allowNull: false,
      // comment: "short ~500 words, medium ~1200 words, long-form ~2000+",
    },
    goal: {
      type: DataTypes.ENUM("inform", "sell", "educate", "capture_leads"),
      allowNull: false,
    },
    cta: {
      type: DataTypes.STRING,
      allowNull: true,
      // comment: "Call-to-action text (e.g., Buy Now, Subscribe)",
    },
    competitors: {
      type: DataTypes.TEXT,
      allowNull: true,
      // comment: "Comma-separated competitor URLs",
    },
    uid: { type: DataTypes.STRING },
    planId: {
      type: DataTypes.INTEGER,
    },
  }, { tableName: 'Inputs' });
};



