require("dotenv/config.js");
const express = require("express");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { WithAuth } = require("../middlewares/auth");

const secret = process.env.JWT_TOKEN;

const router = express.Router();

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userAleadyExists = await User.findOne({ email });

    if (userAleadyExists) {
      res.status(409).json({ error: "User already exists" });
    }

    const user = new User({ name, email, password });
    await user.save();
    const token = jwt.sign({ email }, secret, { expiresIn: "30d" });
    res.status(201).json({ user, token });
  } catch {
    res.status(500).json({ error: "Error registering user" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      res.status(404).json({ error: "User not found" });
    }

    if (!user) {
      res.status(401).json({ error: "Incorrect email or passowrd" });
    } else {
      user.isCorrectPassword(password, function (same) {
        if (!same) {
          res.status(401).json({ error: "Incorrect email or passowrd" });
        } else {
          const token = jwt.sign({ email }, secret, { expiresIn: "30d" });
          res.json({ user, token });
        }
      });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal error, please try again" });
  }
});

router.put("/", WithAuth, async (req, res) => {
  const { name, email } = req.body;
  const id = req.user._id;

  try {
    const newBasics = await User.findOneAndUpdate(
      { _id: id },
      { $set: { name: name, email: email } },
      { upsert: true, returnOriginal: false }
    );

    res.status(200).json(newBasics);
  } catch (error) {
    res.status(500).json({ error: "Problem updating the user, try again" });
  }
});

router.put("/password", WithAuth, async (req, res) => {
  const { password } = req.body;

  try {
    const user = await User.findOne({ _id: req.user._id });

    user.password = password;

    await user.save();

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Problem updating the note, try again" });
  }
});

router.delete("/delete", WithAuth, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user._id });

    user.delete();

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ redirect: false, error: error });
  }
});

module.exports = router;
