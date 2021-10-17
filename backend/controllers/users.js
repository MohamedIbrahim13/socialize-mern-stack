const User = require("../models/user");
const jwt = require("jsonwebtoken");

const handleErrors = err => {
  let errors = { email: "", password: "", firstName: "", lastName: "" };
  if (err.message === "Incorrect Email!!") {
    errors.email = "That email is not registered!!";
  }

  if (err.message === "Incorrect Password!!") {
    errors.password = "Wrong password!!";
  }
  if (err.code === 11000) {
    errors.email = "That email is already registered";
    return errors;
  }
  if (err.message.includes("user validation failed")) {
    Object.values(err.error).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};

const maxAge = 3 * 24 * 60 * 60;
const createToken = id => {
  return jwt.sign({ id }, "mohamed ibrahim", { expiresIn: maxAge });
};

const signUp = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  try {
    const user = await User.create({
      email,
      password,
      name: `${firstName} ${lastName}`,
    });

    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ user, token });
  } catch (error) {
    const errors = handleErrors(error);
    res.status(400).json({ errors });
  }
};

const signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ user, token });
  } catch (error) {
    const errors = handleErrors(error);
    res.status(400).json({ errors });
  }
};

const logOut = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.status(201).json();
  //res.redirect("/");
};

module.exports = {
  signUp,
  signIn,
  logOut,
};
