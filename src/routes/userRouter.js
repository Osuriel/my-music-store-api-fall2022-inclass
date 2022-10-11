const express = require('express');
const bcrypt = require('bcrypt');
const UserModel = require('../models/UserModel');

const userRouter = express.Router();


// Route to create user accounts
userRouter.post('/register-user', async (req, res, next) => {
  // save the user information in the database
  
  // get credentials and user info from the front end
  const { firstName, lastName, email, password, profilePicture } = req.body;
  
  // HASH (Bcrypt) the password
  const hashedPassword = await bcrypt.hash(password, 10);
  
  // store a password hash, not the password
  const userDocument = new UserModel({
    firstName, lastName, email, hashedPassword, profilePicture
  });

  userDocument.save();

  res.send({ user: {
    id: userDocument._id,
    firstName, lastName, email, profilePicture,
    isAdmin: userDocument.isAdmin,
  }
})

});

module.exports = userRouter;
