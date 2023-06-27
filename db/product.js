const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
  pid: {
    type: String,
    required: true,
    default: "KM" + Math.floor(Math.random() * 1000000),
  },
  images: {
    type: Array,
    required: true,
  },
  name: {
    type: String,
  },
  purchasePrice: {
    type: Number,
  },
  purchaseQuantity: {
    type: Number,
  },
  stockQuantity: {
    type: Number,
  },
  purchasedFrom: {
    type: String,
  },
  sellingPrice: {
    type: Number,
  },
  shelfLocation: {
    type: String,
  },
  dateAdded: {
    type: Date,
    default: Date.now(),
  },
});

mongoose.models = {};
module.exports =
  mongoose.models.products || mongoose.model("products", productSchema);
