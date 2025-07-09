const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/User'); // adjust path as needed

require('dotenv').config();

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    const hashedPassword = await bcrypt.hash('Admin@123', 10);
    const admin = new User({
      username: 'admin1',
      email: 'admin@example.com',
      password: hashedPassword,
      role: 'admin'
    });
    await admin.save();
    console.log('✅ Admin created successfully!');
    mongoose.disconnect();
  })
  .catch(err => console.error('❌ Error creating admin:', err));