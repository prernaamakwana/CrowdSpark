const Campaign = require("../models/campaign");

// Create a new campaign
exports.createCampaign = async (req, res) => {
  try {
    const { title, description, goal, deadline, image } = req.body;

    const newCampaign = new Campaign({
      owner: req.user.id,
      title,
      description,
      goal,
      deadline,
      image,
    });

    const saved = await newCampaign.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error while creating campaign" });
  }
};

// Get all campaigns (public)
exports.getAllCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find().populate("owner", "name email");
    res.json(campaigns);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error fetching campaigns" });
  }
};

// Get campaigns created by current user
exports.getUserCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find({ owner: req.user.id });
    res.json(campaigns);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error fetching user campaigns" });
  }
};
