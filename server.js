require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const trackRoutes = require('./routes/tracks')
const userRoutes = require('./routes/user')
const alltracksRoutes=require('./routes/allTracks')
const cors = require("cors");
// express app
const app = express()
app.use(cors());
// middleware
app.use(express.json())

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "https://647a5bde1de3800d446b0ea2--serene-cupcake-cede0c.netlify.app/");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// routes
app.use('/api/tracks', trackRoutes)
app.use('/api/user', userRoutes)
app.use('/api/alltracks',alltracksRoutes)
// connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    const port=process.env.PORT||3000
    app.listen(port, () => {
      console.log('connected to db & listening on port', process.env.PORT)
    })
  })
  .catch((error) => {
    console.log(error)
  })
