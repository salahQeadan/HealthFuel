const mongoose = require("mongoose");

const reviewsSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  feedback: {
    type: String,
    required: true,
  },
});

const Reviews = mongoose.model("Reviews", reviewsSchema);

module.exports = { Reviews };
