const router = require("express").Router();
const { isAuthenticated } = require("../middleware/jwt.middleware")
const { editUser } = require("../controllers/user.controller")

//Edit
router.patch("/edit", isAuthenticated, editUser)

module.exports = router;