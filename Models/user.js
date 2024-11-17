const mongoose = require("mongoose");

//Schema for the User model
const userSchema = new mongoose.Schema({
    userName : {
        type : String,
        require: true,
    },
    password : {
        type : String,
        require:true,
    },
    role:{
        type:String,
        enum:['user', 'admin'],
        require:true
    }
})

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;