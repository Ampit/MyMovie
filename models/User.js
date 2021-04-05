const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
  name: String
});

mongoose.model("users", userSchema); //telling mongoose that we want to create new collection called users
 