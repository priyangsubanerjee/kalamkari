const mongoose = require("mongoose");
const { Schema } = mongoose;

const { v4: uuidv4 } = require("uuid");

// generate 5 digit random number uuid

const generateUUID = () => {
  const uuid = uuidv4();
  const uuidArray = uuid.split("-");
  const uuidNumber = uuidArray[0];
  return uuidNumber.toUpperCase().substring(0, 5);
};

const productSchema = new Schema({
  pid: {
    type: String,
    required: true,
    default: "KM" + generateUUID(),
    unique: true,
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
