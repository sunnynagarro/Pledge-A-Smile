const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GroupMembershipSchema = new Schema(
  {
    groupId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
  }
);

module.exports = mongoose.model("GroupMembership", GroupMembershipSchema);
