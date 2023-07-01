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

const saleSchema = new Schema({
  sid: {
    type: String,
    required: true,
    default: "SL" + generateUUID(),
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
