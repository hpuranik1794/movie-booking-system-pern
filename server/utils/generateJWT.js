const jwt = require("jsonwebtoken");
require("dotenv").config()

const generateJWT = (emailID) => {
  const payload = {
    user: {
      email: emailID
    }
  };

  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1h" });
}

module.exports = generateJWT;
