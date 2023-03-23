const router = require("express").Router();
const { isAuthenticated } = require("../middleware/jwt.middleware")
const { randomVideo, listVideo, videoCtrl } = require("../controllers/video.controller")

//Random
router.get("/random", isAuthenticated, randomVideo)

//Video Ctrl
router.post("/:videoYou", isAuthenticated, videoCtrl)

//List
router.get("/list", isAuthenticated, listVideo)


module.exports = router;