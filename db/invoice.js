const mongoose = require("mongoose");
const { Schema } = mongoose;

const invoiceSchema = new Schema({
  inv: {
    type: String,
    required: true,
    default: "IN" + Math.floor(Math.random() * 1000000),
  },
  products: {
    type: Array,
    required: true,
  },
  name: {
    type: String,
  },
  phone: {
    type: Number,
  },
  total: {
    type: Number,
  },
  status: {
    type: String,
  },
  amountPaid: {
    type: Number,
  },
  paymentMethod: {
    type: String,
  },
  dateAdded: {
    type: Date,
    default: Date.now(),
  },
});

mongoose.models = {};
module.exports =
  mongoose.models.invoices || mongoose.model("invoices", invoiceSchema);
