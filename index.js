// create an express app
const express = require("express");
const app = express();

//import body parser and all packages
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
// const config = require("./DB.js");
const dbConnectionsRoutes = require("./dbConnections/dbConnections.index");
//read environment variables
require("dotenv").config();


// const userRoute = require("./user.route");

const connectUrl = process.env.MONGO_URL;

// use the express-static middleware
app.use(express.static("public"));
// define the first route
app.get("/", rootPath);
function rootPath(req, res) {
  res.send("Hello World");
}

// use body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// use cors middleware
app.use(cors());


app.use("/dbConnections", dbConnectionsRoutes);

// use mongoose middleware
mongoose.Promise = global.Promise;
mongoose
  .connect(connectUrl, { useNewUrlParser: true })
  .then(() => {
    console.log("Database is connected");
  })
  .catch((err) => {
    console.log("Cannot connect to the database" + err);
  });

// use user route
// app.use("/user", userRoute);

// start the server listening for requests
app.listen(3000, () => {
    console.log("Server is running on port 3000");
    //connect to the database
    }
);

//connect to the database
// Language: javascript
 
