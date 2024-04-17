const bcrypt = require("bcrypt");
const pool = require("../dbConfig");
const generateJWT = require("../utils/generateJWT");
const { Users } = require("../sequelize");

const handleLogin = async (req, res) => {
  const { email, pwd } = req.body;

  if (!email || !pwd) return res.sendStatus(400);

  // const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
  const user = await Users.findOne({ where: { email: email } })
  // if (user.rows.length === 0) return res.sendStatus(401);
  if (!user) return res.sendStatus(401);

  // const match = await bcrypt.compare(pwd, user.rows[0].pwd)
  const match = await bcrypt.compare(pwd, user.password)
  if (!match) return res.sendStatus(401);
  else {
    // const accessToken = generateJWT(user.rows[0].email);
    const accessToken = generateJWT(user.email);

    res.json({ accessToken });
  }
}

module.exports = { handleLogin }
