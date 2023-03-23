const router = require("express").Router()
const authRoutes = require("./auth.routes")
const videoRoutes = require ("./video.routes")
const quoteRoutes = require ("./quote.routes")
const userRoutes = require ("./user.routes")
const noteRoutes = require("./note.routes")

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

router.use("/auth", authRoutes)
router.use("/user", userRoutes)
router.use("/video", videoRoutes)
router.use("/quote", quoteRoutes)
router.use("/note", noteRoutes)

module.exports = router;
