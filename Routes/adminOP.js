const express = require("express");
const router = express.Router();

const Assignment = require("../Models/assignment");
const authenticateToken = require("../Middleware/auth");

//Get all assignement related to the admin
router.get("/assignments", authenticateToken,  async(req, res)=>{
    console.log(req.user);
    
    try{
        if(req.user.role !=="admin"){
            return res.status(403).json({error:"Access only for admin"});
        }

        const assignements = await Assignment.find({adminId: req.user.id});

        res.status(200).json({assignements});
    }
    catch(error){
        res.status(500).json({error:"Server error"});
    }
})

//Chenge the status of assignement
router.patch("/assignments/:assignmentId", async(req, res)=>{
    const {assignmentId} = req.params;
    const {status} = req.body;
    await Assignment.updateOne({_id: assignmentId}, {status});
    res.json({message : "Assignment status updates successfully"});
})

module.exports = router;