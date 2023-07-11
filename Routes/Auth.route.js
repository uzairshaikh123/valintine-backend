const express = require("express");
const AuthModel = require("../Models/Auth.Model");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const AuthRouter = express.Router();
const jwt = require("jsonwebtoken");



AuthRouter.post("/register", async (req, res) => {
  let { name, email, password } = req.body;
console.log(req.body)
  try {
    let existingUser = await AuthModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    } else {
      let newuser = new AuthModel({ name, email, password });
      bcrypt.hash(password, saltRounds, async function (err, hash) {
        if (err) {
          return res.status(500).json({ msg: "Internal server error" });
        } else {
          newuser.password = hash;
          await newuser.save();
          return res
            .status(201)
            .json({
              msg: "User created",
              data: newuser,
              token: jwt.sign({ data: newuser }, "authuser"),
            });
        }
      });
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});


AuthRouter.post("/login", async (req, res) => {
  let { email, password } = req.body;

  try {
    let user = await AuthModel.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    } else {
      bcrypt.compare(password, user.password, async function (err, result) {
        if (result) {
          return res
            .status(201)
            .json({
              msg: "User loggedIn Successfully",
              data: user,
              token: jwt.sign({ data: user }, "authuser"),
            });
        } else {
          return res.status(500).json({ msg: err.message });
        }
      });
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

module.exports = AuthRouter;
