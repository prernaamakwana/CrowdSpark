// routes/campaigns.js
const express = require('express');
const router = express.Router();
const Campaign = require('../models/campaign');

// routes/campaigns.js
router.post('/', async (req, res) => {
  try {
    const { title, description, goal, category } = req.body;

    if (!category) {
      return res.status(400).json({ message: 'Category is required' });
    }

    const campaign = new Campaign({ title, description, goal, category });
    await campaign.save();

    res.status(201).json({ message: 'Campaign created successfully', campaign }); // ✅ success response
  } catch (err) {
    console.error("Create Campaign Error:", err);
    res.status(500).json({ message: "Failed to create campaign" }); // ❌ error
  }
});


router.get('/', async (req, res) => {
  try {
    const campaigns = await Campaign.find().sort({ createdAt: -1 });
    res.json(campaigns);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch campaigns' });
  }
});

// Get single campaign
router.get('/:id', async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);
    if (!campaign) return res.status(404).json({ message: 'Campaign not found' });
    res.json(campaign);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
