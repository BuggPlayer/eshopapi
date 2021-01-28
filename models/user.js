const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  passwordHash: {
    type: String,
    require: true,
  },
  phone: {
    type: String,
    require: true,
  },
  isAdmin: {
    type: String,
    require: true,
  },
  street: {
    type: String,
    require: true,
  },
  apartment: {
    type: String,
    require: true,
  },
  zip: {
    type: String,
    require: true,
  },

  city: {
    type: String,
    require: true,
  },
  country: {
    type: String,
    require: true,
  },
});

userSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

userSchema.set("toJSON", {
  virtuals: true,
});
module.exports = mongoose.model("User", userSchema);
