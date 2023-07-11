const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
  name: { type: String, required: true },
  desc: { type: String, required: true },
  img: { type: String, required: true },
  price: { type: Array, required: true },
  rating: { type: String, required: true },
});

const AuthModel = mongoose.model("products", ProductSchema);

module.exports = AuthModel;
