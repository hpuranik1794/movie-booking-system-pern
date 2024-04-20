const User = require("../sequelize");

const handleLogout = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204);

  const refreshToken = cookies.jwt;

  const user = User.findOne({ where: { refresh_token: refreshToken } });
  if (!user) {
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    return res.sendStatus(204);
  }
  user.refreshToken = '';
  const result = await user.save();
  console.log(result);
  res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
  res.sendStatus(204);
}

module.exports = { handleLogout }
