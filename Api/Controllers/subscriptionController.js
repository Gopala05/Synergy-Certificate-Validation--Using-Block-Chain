const Stripe = require("stripe");
const userModal = require("../Model/userModal");
const SubscriptionModal = require("../Model/subscriptionModal");

require("dotenv").config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-06-20",
  typescript: false,
});

const settingsUrl = `${process.env.NEXT_PUBLIC_WEB_URL_1}/settings`;
const Gold_Price_ID = process.env.STRIPE_GOLD_PRICE_ID;
const Platinum_Price_ID = process.env.STRIPE_PLATINUM_PRICE_ID;
const DAY_IN_MS = 86_400_00;

exports.subscription = async (req, res, next) => {
  const { user, subscriptionType } = req.body;

  try {
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Handle For AUTH
    const userSubscription = await SubscriptionModal.findOne({
      userName: user.userName,
    });

    if (userSubscription && userSubscription.stripeUserId) {
      const stripeSessionForBilling =
        await stripe.billingPortal.sessions.create({
          customer: userSubscription.stripeUserId,
          return_url: settingsUrl,
        });

      return res.status(200).json({ url: stripeSessionForBilling.url });
    }

    const stripeSession = await stripe.checkout.sessions.create({
      mode: "subscription",
      success_url: settingsUrl,
      cancel_url: settingsUrl,
      payment_method_types: ["card"],
      billing_address_collection: "auto",
      // customer_email: user.userEmails[0],
      metadata: {
        userName: (user?.userName).toString(),
        plan: subscriptionType.toString().toLowerCase(),
      },
      line_items: [
        {
          // price_data: {
          //   // currency: subscriptionType.currency,
          //   currency: "INR",
          //   product_data: {
          //     name: "Synergy",
          //     description: "Certificates Validation System.",
          //   },
          //   // unit_amount: subscriptionType.amount,
          //   unit_amount: 149900,
          //   recurring: {
          //     // interval: subscriptionType.interval,
          //     interval: "month",
          //   },
          // },
          price: subscriptionType == "GOLD" ? Gold_Price_ID : Platinum_Price_ID,
          quantity: 1,
        },
      ],
    });
    // if (subscriptionType == "PLATINUM" && Platinum_Payment_Link) {
    //   return res.status(200).json({
    //     url: `${Platinum_Payment_Link}?prefilled_email=${user.userEmails[0]}&user_id=${user.userName}`,
    //   });
    // } else if (subscriptionType == "GOLD" && Gold_Payment_Link) {
    //   return res.status(200).json({
    //     url: `${Gold_Payment_Link}?prefilled_email=${user.userEmails[0]}&user_id=${user.userName}`,
    //   });
    // } else {
    //   return res.status(500).json({ message: "Payment Link not configured" });
    // }

    return res.status(200).json({ url: stripeSession.url });
  } catch (error) {
    console.log("[Stripe Error]: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.checkSubscription = async (req, res, next) => {
  const { user } = req.body;
  try {
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Handle For AUTH
    const userSubscription = await SubscriptionModal.findOne({
      userName: user.userName,
    });

    if (!userSubscription) {
      return res.status(200).json({ message: "No Subscription Found" });
    }

    const isValid =
      userSubscription.stripePriceId &&
      userSubscription.stripeCurrentPeriod?.getTime() + DAY_IN_MS > Date.now();
    return res.status(200).json({ plan: userSubscription, valid: isValid });
  } catch (error) {
    console.log("[Check Stripe Subscription Error]: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getPlan = async (req, res, next) => {
  const userName = req.params.userName;

  try {
    if (!userName) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Handle For AUTH
    const user = await userModal.findOne({
      userName: userName,
    });

    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }
    return res.status(200).json({ plan: user.subscription });
  } catch (error) {
    console.log("[Check Stripe Subscription Error]: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
