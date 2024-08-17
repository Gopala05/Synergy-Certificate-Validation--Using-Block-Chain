const express = require("express");
const mongoose = require("mongoose");
const next = require("next");
const dotenv = require("dotenv");
const cors = require("cors");

// Import routers
const nftRouter = require("./Api/Routers/nftRouter");
const userRouter = require("./Api/Routers/userRouter");
const authRouter = require("./Api/Routers/authRouter");
const requestRouter = require("./Api/Routers/requestRouter");
const subscriptionRouter = require("./Api/Routers/subscriptionRouter");
const userDetailsRouter = require("./Api/Routers/userDetailsRouter");
const SubscriptionModal = require("./Api/Model/subscriptionModal");
const userModal = require("./Api/Model/userModal");

// Initialize environment variables
dotenv.config({ path: "./.env" });

// Define environment
const development = process.env.NODE_ENV !== "production";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// Initialize Next.js
const nextServer = next({ dev: development });
const handle = nextServer.getRequestHandler();

// Initialize Express
const app = express();

const corsOptions = {
  origin: '*', // Replace with your frontend origin
  credentials: true, // Allow credentials
};

app.use(cors(corsOptions));

// Connect to MongoDB
const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB Connected Successfully!"))
  .catch((err) => console.log("DB Connection Error: ", err));

const port = process.env.PORT || 3000;
const endpointSecret = process.env.STRIPE_WEBHOOK_KEY;

// Define routes
app.use("/api/v1/auth", express.json(), authRouter);
app.use("/api/v1/users", express.json(), userRouter);
app.use("/api/v1/nfts", express.json(), nftRouter);
app.use("/api/v1/link", express.json(), requestRouter);
app.use("/api/v1/stripe", express.json(), subscriptionRouter);
app.use("/api/v1/userdetails", express.json(), userDetailsRouter);

// Webhook route with raw body handling
app.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    const signature = req.headers["stripe-signature"];

    if (!endpointSecret) {
      console.error("⚠️  Stripe webhook key is not defined.");
      return res.sendStatus(500);
    }

    if (!signature) {
      console.error("⚠️  Stripe signature header is missing.");
      return res.sendStatus(400);
    }

    let event;
    let userName;
    let plan;

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        signature,
        endpointSecret
      );

      const eventType = event.type;
      const eventSession = event.data.object;

      if (eventType === "checkout.session.completed") {
        userName = eventSession.metadata.userName;
        plan = eventSession.metadata.plan;

        if (!userName) {
          console.error("⚠️  Metadata `userName` not found.");
          return res.status(400).send("User Name not found in metadata");
        }

        const subscription = await stripe.subscriptions.retrieve(
          eventSession.subscription
        );

        try {
          await SubscriptionModal.create({
            userName: userName,
            stripeSubscriptionId: subscription.id,
            stripeUserId: subscription.customer,
            stripePriceId: subscription.items.data[0].price.id,
            stripeCurrentPeriod: new Date(
              subscription.current_period_end * 1000
            ),
          });
        } catch (error) {
          console.error("Error creating subscription:", error);
        }

        try {
          await userModal.findOneAndUpdate(
            { userName: userName },
            { $set: { subscription: plan } },
            { new: true }
          );
        } catch (error) {
          console.error("Error updating user Subscription:", error);
        }
      }

      if (eventType === "invoice.payment_succeeded") {
        const subscription = await stripe.subscriptions.retrieve(
          eventSession.subscription
        );

        try {
          await SubscriptionModal.findOneAndUpdate(
            { stripeSubscriptionId: subscription.id },
            {
              $set: {
                stripePriceId: subscription.items.data[0].price.id,
                stripeCurrentPeriod: new Date(
                  subscription.current_period_end * 1000
                ),
              },
            },
            { new: true }
          );
        } catch (error) {
          console.error("Error updating Subscription:", error);
        }
      }

      return res.status(200).send("Success");
    } catch (err) {
      console.error("⚠️  Webhook signature verification failed.", err.message);
      return res.sendStatus(400);
    }
  }
);

// Handle Next.js routes
app.get("*", (req, res) => {
  return handle(req, res);
});

// Start server
nextServer.prepare().then(() => {
  app.listen(port, () => {
    console.log(`Server is Running on port: ${port}`);
  });
});
