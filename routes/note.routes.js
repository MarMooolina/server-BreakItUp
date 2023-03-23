const router = require("express").Router();
const { getById, deleteNote , updateNote, createNote, listNote } = require("../controllers/note.controller");
const { isAuthenticated } = require("../middleware/jwt.middleware.js");

//Create
router.post("/create", isAuthenticated, createNote)

//List
router.get("/list", isAuthenticated, listNote)

//getByID
router.get("/:noteID", isAuthenticated, getById)

//Edit
router.patch("/:noteID/edit",isAuthenticated, updateNote)

//Delete
router.delete("/:noteID/delete", isAuthenticated, deleteNote)

module.exports = router