require('dotenv').config()
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
var cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/userRouter');

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


// EXPRESS MIDDLEWARES:
// A function that run in the middle of our request.
// That a function that runs after the server receives a request and before the express server sends a response.

//userRoutes
app.use(userRouter);


app.listen(port, () => console.log('Music store server is listening for request'));