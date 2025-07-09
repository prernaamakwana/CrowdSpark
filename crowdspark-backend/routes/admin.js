const express = require("express");
const router = express.Router();
const auth = require("../controllers/middleware/authMiddleware");
const verifyAdmin = require("../controllers/middleware/verifyAdmin");

const Campaign = require("../models/campaign");
const User = require("../models/user");
const Contribution = require("../models/Contribution");

// 🔹 Paginated campaign list (admin only)
router.get("/campaigns", auth, verifyAdmin, async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  try {
    const campaigns = await Campaign.find()
      .populate("creator", "email")
      .select("title goal category creator status createdAt")
      .skip((page - 1) * limit)
      .limit(limit);

    const totalCampaigns = await Campaign.countDocuments();

    const formatted = campaigns.map((c) => ({
      _id: c._id,
      title: c.title?.trim() || "Untitled",
      goal: typeof c.goal === "number" ? c.goal : 0,
      category: c.category || "other",
      status: c.status || "pending",
      createdAt: c.createdAt,
      creator: { email: c.creator?.email || "N/A" }
    }));

    res.json({ campaigns: formatted, totalCampaigns });
  } catch (err) {
    console.error("Admin Campaign Fetch Error:", err);
    res.status(500).json({ message: "Failed to fetch campaigns" });
  }
});

// 🔹 Update campaign status
router.put("/campaigns/:id/status", auth, verifyAdmin, async (req, res) => {
  const { status } = req.body;
  try {
    const updated = await Campaign.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Failed to update campaign status" });
  }
});

// 🔹 Dashboard statistics
router.get("/dashboard-stats", auth, verifyAdmin, async (req, res) => {
  try {
    const totalCampaigns = await Campaign.countDocuments();
    const pendingCampaigns = await Campaign.countDocuments({ status: "pending" });
    const approvedCampaigns = await Campaign.countDocuments({ status: "approved" });
    const rejectedCampaigns = await Campaign.countDocuments({ status: "rejected" });
    const totalUsers = await User.countDocuments();
    const totalContributions = await Contribution.countDocuments();

    res.json({
      totalCampaigns,
      pendingCampaigns,
      approvedCampaigns,
      rejectedCampaigns,
      totalUsers,
      totalContributions
    });
  } catch (err) {
    console.error("Dashboard Stats Error:", err);
    res.status(500).json({ message: "Failed to fetch dashboard stats" });
  }
});

// 🔹 Paginated contribution list
router.get("/contributions", auth, verifyAdmin, async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  try {
    const contributions = await Contribution.find()
      .populate("userId", "username email")
      .populate("campaignId", "title category")
      .skip((page - 1) * limit)
      .limit(limit);

    const totalContributions = await Contribution.countDocuments();

    const formatted = contributions.map((contrib) => ({
      _id: contrib._id,
      amount: contrib.amount,
      createdAt: contrib.createdAt,
      user: {
        username: contrib.userId?.username || "Unknown",
        email: contrib.userId?.email || "N/A"
      },
      campaign: {
        title: contrib.campaignId?.title || "Untitled",
        category: contrib.campaignId?.category || "Other"
      }
    }));

    res.json({ contributions: formatted, totalContributions });
  } catch (err) {
    console.error("Admin Contributions Error:", err);
    res.status(500).json({ message: "Failed to fetch contributions" });
  }
});

module.exports = router;