const express = require('express');
const router = express.Router();
const Campaign = require('../models/campaign');


router.post('/', async (req, res) => {
  try {
    const { title, description, goal, category, endDate } = req.body;

    if (!category) {
      return res.status(400).json({ message: 'Category is required' });
    }

    const campaign = new Campaign({ title, description, goal, category, endDate });
    await campaign.save();

    res.status(201).json({ message: 'Campaign created successfully', campaign }); 
  } catch (err) {
    console.error("Create Campaign Error:", err);
    res.status(500).json({ message: "Failed to create campaign" }); 
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


router.get('/:id', async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);
    if (!campaign) return res.status(404).json({ message: 'Campaign not found' });
    res.json(campaign);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Campaign.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Campaign not found' });
    }
    res.status(200).json({ message: 'Campaign deleted successfully' });
  } catch (err) {
    console.error('Delete error:', err);
    res.status(500).json({ message: 'Failed to delete campaign' });
  }
});

module.exports = router;
