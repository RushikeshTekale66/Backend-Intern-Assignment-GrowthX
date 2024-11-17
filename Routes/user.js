const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../Models/user");

//User Registratin API
router.post("/register", async(req, res)=>{
    try{
        const {userName, password} = req.body;
        console.log(req.body);
        
        //Check all the inputs
        if(!userName || !password || userName.trim() === ""){
            return res.status(400).json({error : "Username & Password are required"})
        }

        //Check existing user
        const existingUser = await User.findOne({ userName});
        if(existingUser){
          return res.status(400).json({error:"User already exist"});

        }

        //Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({userName, password : hashedPassword, role : 'user'});
        console.log(newUser);
        

        //save new user to database
        await newUser.save();
        res.status(201).json({message : "User registered successfully"});
    }
    catch(error){
      console.log(error);
      
        res.status(500).json({error : "Registration fail"});
    }
})

//User Login Successfully
router.post('/login', async (req, res) => {
    try {
      const { userName, password } = req.body;
      console.log(req.body);
      
      //Check all the inputs fields
      if(!userName || !password){
        return res.status(400).json({error:"UserName & Password are required"});
      }
      
      //Check user present in database
      const user = await User.findOne({ userName});
      
      if(!user){
        return res.status(401).json({error:"Invalid creadentials"});
      }

      //Check the password matches to the previous password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if(!isPasswordValid){
        res.status(401).json({error:"Invalid Creadentials"});
      }
      
      //Create a token for the authentication
      const token = jwt.sign({ id: user._id, role: user.role }, 'secretKey', { expiresIn: '1h' });
      
      res.status(200).json({ token });
    } catch (err) {
      res.status(500).json({ error: 'Server error' });
    }
  });


  module.exports = router;