const express = require('express');
const UserModel = require('../models/UserModel');

const userRouter = express.Router();

// Route to create user accounts
userRouter.post('/register-user', (req, res, next) => {
  
  console.log('req.body: ', req.body);

  const { firstName, lastName, email, password, profilePicture } = req.body;

  const userDocument = new UserModel({
    firstName, lastName, email, password, profilePicture
  });

  userDocument.save();

  res.send('Route hit successfully');
});

module.exports = userRouter;
