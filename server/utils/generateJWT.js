const jwt = require("jsonwebtoken");
require("dotenv").config()

const generateJWT = (emailID, option) => {
  const secret = option==="a" ? process.env.ACCESS_TOKEN_SECRET : process.env.REFRESH_TOKEN_SECRET;
  const validity = option==="a" ? "1h" : "1d";
  const payload = {
    user: {
      email: emailID
    }
  };

  return jwt.sign(payload, secret, { expiresIn: validity });
}

module.exports = generateJWT;
