const mongoose = require("mongoose");
const { Schema } = mongoose;

const saleSchema = new Schema({
  sid: {
    type: String,
    required: true,
    default: "SL" + Math.floor(Math.random() * 1000000),
  },
  dateAdded: {
    type: Date,
    default: Date.now(),
  },
  type: {
    type: String,
  },
  amount: {
    type: String,
  },
});

mongoose.models = {};
module.exports = mongoose.models.sales || mongoose.model("sales", saleSchema);
