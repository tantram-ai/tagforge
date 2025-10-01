const express = require("express");
const dotenv = require("dotenv");
const nodeEnv = process.env.NODE_ENV || "development";
dotenv.config({ path: `.env.${nodeEnv}` });
const db = require('./models');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors')
const cookieParser = require("cookie-parser");
const generateRoutes = require('./routes/generate');
const metasRoutes = require('./routes/metas'); // create similarly
const stripeRoutes = require('./routes/stripe');
const testRoute = require('./routes/test');
const subscriptionRoute = require('./routes/subscribe')
const signupRoute = require('./routes/signup')
const signInRoute = require('./routes/signIn')
const planRoute = require('./routes/getPlans')
const resendVerificationRoute = require('./routes/resendverification')
const forgotPasswordRoute = require('./routes/forgotPassword')


app.use(bodyParser.urlencoded({ extended: true }));
const dbPort = process.env.SERVER_PORT;

const whitelist = ["*", "http://localhost:5173"];

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
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api', generateRoutes);
app.use('/api', metasRoutes);
app.use('/api', testRoute);
app.use('/api', subscriptionRoute)
app.use('/api', signupRoute)
app.use('/api', signInRoute)
app.use('/api', planRoute)
app.use('/api', resendVerificationRoute)
app.use('/api', forgotPasswordRoute)


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
