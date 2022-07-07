const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      default: "",
    },
    tabsOpened: {
      type: Number,
      default: 0,
    },
    referralId: {
      type: String,
      required: true,
    },
    referrals: {
      type: String,
      default: "[]",
    },
    impactLevel: {
      type: String,
      default: 1,
    },
    resetPasswordToken: {
      type: String,
    },
    resetPasswordExpires: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", UserSchema);
