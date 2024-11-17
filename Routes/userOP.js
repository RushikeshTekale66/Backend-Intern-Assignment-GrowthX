const express = require('express');
const router = express.Router();
const User = require("../Models/user");
const Assignment = require("../Models/assignment");
const authenticateToken = require("../Middleware/auth");
  //Upload new assignment 

  router.post('/upload', authenticateToken, async (req, res) => {
    try {
      if (req.user.role !== 'user') {
        return res.status(403).json({ error: 'Access denied' });
      }
      const { task, adminId } = req.body;
      const assignment = new Assignment({ userId: req.user.id, task, adminId });
      await assignment.save();
      res.status(201).json({ message: 'Assignment uploaded successfully' });
    } catch (err) {
      res.status(500).json({ error: 'Server error' });
    }
  });
  

  //get all the admins
  router.get('/admins', authenticateToken, async (req, res) => {
    try {
      const admins = await User.find({ role: 'admin' });
      res.status(200).json(admins);
    } catch (err) {
      res.status(500).json({ error: 'Server error' });
    }
  });

  module.exports = router;
  