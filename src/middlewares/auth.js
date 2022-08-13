require("dotenv/config.js");
const jwt = require("jsonwebtoken");
const User = require("../models/user.js");
const secret = process.env.JWT_TOKEN;

const WithAuth = (req, res, next) => {
  const token = req.headers["purplenotes.token"];

  if (!token) {
    res.status(401).json({ error: "Unauthorized: no token provided" });
  } else {
    jwt.verify(token, secret, (error, decoded) => {
      if (error) {
        res.status(401).json({ error: "Unauthorized: invalid token" });
      } else {
        req.email = decoded.email;
        User.findOne({ email: decoded.email })
          .then((user) => {
            req.user = user;
            next();
          })
          .catch((err) => res.status(401).json({ error: err }));
      }
    });
  }
};

module.exports = { WithAuth };
