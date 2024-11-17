const express = require("express");
require("./DB/connect");

const app = express();
app.use(express.json());
const port = 5000;

const userRoutes = require("./Routes/user");
const userOP = require("./Routes/userOP");
const adminOP = require("./Routes/adminOP");

//Routes
app.use("/user", userRoutes);
app.use("/user/op", userOP);
app.use("/admin/op", adminOP);

app.listen(port, ()=>console.log("Application is running on port : ", port))