const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ShortcutSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    createdBy: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Shortcut", ShortcutSchema);
