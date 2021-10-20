require('dotenv').config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();

const postsRoutes = require("./routes/posts");
const usersRoutes = require("./routes/users");
const { checkUser } = require("./middleware/authMiddleware");

const PORT = process.env.PORT || 5000;

app.use(express.json({ limit: "30mb", extended: false }));
app.use(express.urlencoded({ limit: "30mb", extended: false }));
app.use(cookieParser());
app.use(cors());

//app.get('*',checkUser)
app.use("/posts", checkUser, postsRoutes);
app.use("/users", usersRoutes);

mongoose
  .connect(
    process.env.URI,
    { useUnifiedTopology: true, useNewUrlParser: true }
  )
  .then(result => {
    app.listen(PORT, () => {
      console.log("Connection has been made to the port & the database");
    });
  })
  .catch(err => console.log(err));

