const express = require("express");
require('dotenv').config();
const db = require('./models');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors')
const generateRoutes = require('./routes/generate');
const metasRoutes = require('./routes/metas'); // create similarly
const stripeRoutes = require('./routes/stripe');
const testRoutes = require('./routes/test')


app.use(bodyParser.urlencoded({ extended: true }));
const dbPort = process.env.SERVER_PORT;

const whitelist = ["*"];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) {
      callback(null, true);
    } else if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors(corsOptions));

app.use(express.json());


// Routes
app.use('/api', generateRoutes);
app.use('/api/metas', metasRoutes);
app.use('/api/test',testRoutes)

// Stripe webhook needs raw body
app.use('/webhook/stripe', express.raw({ type: 'application/json' }), stripeRoutes);


const PORT = dbPort || 3000;

(async () => {
  try {
    await db.sequelize.authenticate();
    console.log("✅ DB connected");
    await db.sequelize.sync({ alter: true });
    console.log("✅ Models synced");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Unable to connect to the DB:", error);
  }
})();
