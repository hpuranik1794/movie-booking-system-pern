const router = require("express").Router();
const registerController = require("../controllers/registerController");
const loginController = require("../controllers/loginController");

router.post("/register", registerController.handleRegister);

router.post("/login", loginController.handleLogin);


module.exports = router;
