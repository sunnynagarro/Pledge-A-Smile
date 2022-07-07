const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GlobalTabsSchema = new Schema(
  {
    tabsOpened: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const GlobalTabs = mongoose.model("GlobalTabs", GlobalTabsSchema);
module.exports = GlobalTabs;
