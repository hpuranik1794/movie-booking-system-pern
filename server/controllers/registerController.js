const bcrypt = require("bcrypt");
const pool = require("../dbConfig");

const handleRegister = async (req, res) => {
  const { email, pwd } = req.body;

  if (!email || !pwd) return res.sendStatus(400);
  const results = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
  if (results.rows.length > 0) return res.sendStatus(409);
  try {
    
    const salt = await bcrypt.genSalt(10);
    const hashedPwd = await bcrypt.hash(pwd, salt);
    const newUser = await pool.query("INSERT INTO users (email, pwd) VALUES ($1, $2) RETURNING *", 
    [email, hashedPwd]);

    console.log(newUser);
    
    res.status(201).json({ "success": "New user created" });
  } catch (err) {
    res.status(500).json({ "message": err.message });
  }
};

module.exports = { handleRegister }
