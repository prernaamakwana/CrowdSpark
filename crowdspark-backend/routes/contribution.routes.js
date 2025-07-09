const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const Contribution = require('../models/Contribution');

// 🧾 Get contributions for logged-in user
router.get("/my", auth, async (req, res) => {
  try {
    const contributions = await Contribution.find({ userId: req.user.userId }).populate("campaignId");
    res.json(contributions);
  } catch (err) {
    console.error("Contribution Fetch Error:", err);
    res.status(500).json({ message: "Failed to fetch contributions" });
  }
});

module.exports = router;