const router = require("express").Router();
const validCredentials = require("../middleware/validCredentials");
const registerController = require("../controllers/registerController");
const loginController = require("../controllers/loginController");

router.post("/register", validCredentials, registerController.handleRegister);

router.post("/login", loginController.handleLogin);


module.exports = router;
