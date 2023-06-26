const mongoose = require("mongoose");
const { Schema } = mongoose;

const adminSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

mongoose.models = {};
module.exports =
  mongoose.models.admins || mongoose.model("admins", adminSchema);
