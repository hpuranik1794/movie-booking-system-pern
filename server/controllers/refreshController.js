require("dotenv").config();
const User = require("../sequelize");
const jwt = require("jsonwebtoken");

const handleRefresh = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;
  
  const user = User.findOne({ where: { refresh_token: refreshToken } });
  if (!user) return res.sendStatus(403);

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    (err, decoded) => {
      if (err || user.email !== decoded.email) return res.sendStatus(403);
      const newAccessToken = jwt.sign(
        { email: decoded.email }, 
        process.env.ACCESS_TOKEN_SECRET, 
        { expiresIn: "1hr" }
      );
      res.json({ newAccessToken });
    }
  )
}

module.exports = { handleRefresh }

