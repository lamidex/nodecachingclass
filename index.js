const express = require('express');
const mongoose = require('mongoose');
const UserModel = require('./models/user');
const cache = require('./utils/cache');

const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/caching-demo');

// Create user
app.post('/users', async (req, res) => {
    try {
      const user = new UserModel(req.body);
      await user.save();
      cache.del('users');
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  // Get all users
app.get('/users', async (req, res) => {
    try {
      const cachedUsers = cache.get('users');
      if (cachedUsers) {
        console.log('Cache HIT: Getting all users from cache');
        return res.json(cachedUsers);
      }
      console.log('Cache MISS: Getting all users from database');
      const users = await UserModel.find();
      cache.set('users', users);
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Get user by ID
app.get('/users/:id', async (req, res) => {
    try {
      const cachedUser = cache.get(`user-${req.params.id}`);
      if (cachedUser) {
        console.log(`Cache HIT: Getting user ${req.params.id} from cache`);
        return res.json(cachedUser);
      }
      console.log(`Cache MISS: Getting user ${req.params.id} from database`);
      const user = await UserModel.findById(req.params.id);
      if (!user) return res.status(404).json({ message: 'User not found' });
      cache.set(`user-${req.params.id}`, user);
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Update user
app.put('/users/:id', async (req, res) => {
    try {
      const user = await UserModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!user) return res.status(404).json({ message: 'User not found' });
      cache.del(`user-${req.params.id}`);
      cache.del('users');
      res.json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  // Delete user
app.delete('/users/:id', async (req, res) => {
    try {
      const user = await UserModel.findByIdAndDelete(req.params.id);
      if (!user) return res.status(404).json({ message: 'User not found' });
      cache.del(`user-${req.params.id}`);
      cache.del('users');
      res.json({ message: 'User deleted' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});