const mongoose = require("mongoose");
const { Schema } = mongoose;

const subscriptionSchema = new Schema(
  {
    userName: {
      type: String,
      unique: true,
      required: true,
    },
    stripeUserId: {
      type: String,
      unique: true,
      sparse: true,
    },
    stripeSubscriptionId: {
      type: String,
      unique: true,
      sparse: true,
    },
    stripePriceId: {
      type: String,
      unique: true,
      sparse: true, // Allows this field to be unique only if it exists
    },
    stripeCurrentPeriod: {
      type: Date,
    },
  },
  {
    timestamps: true, // Optionally add createdAt and updatedAt fields
  }
);

const SubscriptionModal = mongoose.model("Subscription", subscriptionSchema);

module.exports = SubscriptionModal;
