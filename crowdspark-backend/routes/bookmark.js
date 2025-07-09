const express = require("express");
const { addBookmark, removeBookmark, getBookmarks } = require("../controllers/bookmarkController");
const { verifyToken } = require("../controllers/middleware/authMiddleware");

const router = express.Router();

router.post("/:id", verifyToken, addBookmark);        // Add campaign to bookmarks
router.delete("/:id", verifyToken, removeBookmark);    // Remove campaign
router.get("/", verifyToken, getBookmarks);            // Get all user's bookmarks

module.exports = router;