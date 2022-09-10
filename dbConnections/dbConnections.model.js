const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dbConnectionsSchema = new Schema(
  {
    name: {
      type: String,
    },
    url: {
      type: String,
    },
    instanceObj: {
      type: Object,
    },
    id: {
      type: String,
    },
    instanceId: {
      type: String,
    },
  },
  {
    timestamps: true,
    strict: false,
  }
);

module.exports = mongoose.model("dbconnections", dbConnectionsSchema);
