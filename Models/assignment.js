const mongoose = require("mongoose");

//Schema for the assignment 

const assignmentSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId, 
        ref : 'user', 
        require:true
    },
    task : {
        type:String,
        require:true
    },
    adminId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user',
        require:true
    },
    timeStamp:{
        type:Date, 
        type:Date,
        default:Date.now
    },
    status:{
        type:String,
        enum:['pending', 'accept', 'reject'],
        default:'pending'
    }
})

const assignmentModel = mongoose.model("assignment", assignmentSchema);

module.exports = assignmentModel;