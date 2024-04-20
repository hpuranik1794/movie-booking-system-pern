const User = require("../sequelize");
const generateJWT = require("../utils/generateJWT");

const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;

    const foundUser = await User.findOne({ where : { refresh_token: refreshToken } });
    if (!foundUser) return res.sendStatus(403); //Forbidden 
    // evaluate jwt 
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
          if (err || foundUser.username !== decoded.username) return res.sendStatus(403);
          const accessToken = generateJWT(foundUser.email, "a");
          res.json({ accessToken });
      }
    );
}

module.exports = { handleRefreshToken }
