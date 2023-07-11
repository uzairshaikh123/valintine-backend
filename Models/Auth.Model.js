const mongoose = require("mongoose");

const AuthSchema = mongoose.Schema({
  name: { type: String, required: false },
  email: { type: String, required: true },
  password: { type: String, required: true },
  cart: { type: Array, required: false },
  address: { type: String, required: false },
});

const AuthModel = mongoose.model("users", AuthSchema);

module.exports = AuthModel;
