const express = require("express");
const router = express.Router();
const usersRouter = require("../controllers/users");

router.post("/signup", usersRouter.signUp);
router.post("/signin", usersRouter.signIn);
router.get("/logout", usersRouter.logOut);

module.exports = router;
