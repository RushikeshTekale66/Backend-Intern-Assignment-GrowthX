const mongoose = require("mongoose");

//Database connection link

mongoose.connect("mongodb://127.0.0.1:27017/GrowthX").then(console.log("Connected to database")).catch((e)=>console.log("Error on connection ",  e))
