require('dotenv').config()
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
var cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const UserModel = require('./models/UserModel');
const userRouter = require('./routes/userRouter');
const jwt = require('jsonwebtoken');
const productRouter = require('./routes/productRouter');


const port = process.env.PORT;

const app = express();

mongoose.connect(process.env.MONGO_DB_CONNECTION_STRING)
.then(() => console.log("Connected to mongo db successfully"))
.catch(() => console.log("unable to connect to mongodb"))

app.use(cors({
  credentials: true,
  origin: 'http://localhost:3000'
}));

app.use(cookieParser());

// Parsing JSON to req.body
app.use(bodyParser.json());

//Authorization Middleware
app.use(async (req, res, next) => {
  try {
      const { session_token: sessionToken } = req.cookies;
      
      if(!sessionToken){
        return next();
      }
    
      // This returns the data in the JWT or it throws if the jwt is not valid
      const { userId, iat } = jwt.verify(sessionToken, process.env.AUTH_SECRET_KEY);
    
      // if the token is too old we reject it.
      if( iat < (Date.now() - (30 * 24 * 60 * 60 * 1000))){
        return res.status(401).send("Session expired")
      }
    
      const foundUser = await UserModel.findOne( { _id: userId }); 
      
      if(!foundUser){
        return next();
      }
    
      // after we find the user in the token we add it to the request
      req.user = foundUser;
    
      return next();
  } catch (error) {
    next(error);
  }
});


// EXPRESS MIDDLEWARES:
// A function that run in the middle of our request.
// That a function that runs after the server receives a request and before the express server sends a response.

//userRoutes
app.use(userRouter);

// Product Routes
app.use(productRouter);


app.listen(port, () => console.log('Music store server is listening for request'));