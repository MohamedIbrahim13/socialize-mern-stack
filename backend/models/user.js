const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require("validator").default;
const bycrpt = require("bcrypt");

const userSchema = new Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: [true, "Please enter an email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    minlength: [6, "Minimum password length is 6 characters"],
  },
  id: { type: String },
});

userSchema.pre("save", async function () {
  const salt = await bycrpt.genSalt();
  this.password = await bycrpt.hash(this.password, salt);
});

userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bycrpt.compare(password, user.password);
    if (auth) {
      return user;
    } else {
      throw Error("Incorrect Password!!");
    }
  }
  throw Error("Incorrect Email!!");
};

const User = mongoose.model("User", userSchema);

module.exports = User;
