require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const commentRoutes = require('./routes/comments');
const updateRoutes = require('./routes/updates');


app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require('./routes/auth');
const campaignRoutes = require('./routes/campaigns');

app.use('/api/auth', authRoutes);
app.use('/api/campaigns', campaignRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/updates', updateRoutes);


mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(5000, () => console.log('Server started on port 5000'));
  })
  .catch((err) => console.error('DB Connection Failed:', err));
