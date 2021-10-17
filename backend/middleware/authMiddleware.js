const User = require("../models/user");
const jwt = require("jsonwebtoken");

const checkUser = (req, res, next) => {
  const token = req.headers.authorization.split("Bearer ")[1];
  if (token) {
    jwt.verify(token, "mohamed ibrahim", async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        next();
      } else {
        res.locals.user = await User.findById(decodedToken.id);
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

module.exports = {
  checkUser,
};
