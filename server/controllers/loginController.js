const bcrypt = require("bcrypt");
const pool = require("../dbConfig");
const generateJWT = require("../utils/generateJWT");
const { User } = require("../sequelize");

const handleLogin = async (req, res) => {
  const { email, pwd } = req.body;

  if (!email || !pwd) return res.sendStatus(400);

  // const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
  const user = await User.findOne({ where: { email: email } })
  // if (user.rows.length === 0) return res.sendStatus(401);
  if (!user) return res.sendStatus(401);

  // const match = await bcrypt.compare(pwd, user.rows[0].pwd)
  const match = await bcrypt.compare(pwd, user.password)
  if (!match) return res.sendStatus(401);
  
  // const accessToken = generateJWT(user.rows[0].email);
  const accessToken = generateJWT(user.email, "a");
  const refreshToken = generateJWT(user.email, "r");
  user.refresh_token = refreshToken;
  await user.save();
  console.log(res.cookie('jwt'));
  res.cookie('jwt', refreshToken, { 
    httpOnly: true, 
    sameSite: 'None', 
    secure: true, 
    maxAge: 24 * 60 * 60 * 1000 
  });  
  res.json({ accessToken });
  
}

module.exports = { handleLogin }
