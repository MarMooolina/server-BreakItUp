const router = require("express").Router();
const { quoteCtrl, listQuotes, getRandomQuote } = require("../controllers/quote.controller");
const { isAuthenticated } = require("../middleware/jwt.middleware.js");

//List
router.get("/list", isAuthenticated, listQuotes)

//Ctrl
router.post("/ctrl", isAuthenticated, quoteCtrl)

//Random
router.get("/random", isAuthenticated, getRandomQuote )

module.exports = router