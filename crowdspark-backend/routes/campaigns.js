const express = require("express");
const {
  createCampaign,
  getAllCampaigns,
  getUserCampaigns
} = require("../controllers/campaignController");
const auth = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", auth, createCampaign);
router.get("/", getAllCampaigns);
router.get("/my", auth, getUserCampaigns);

module.exports = router;
