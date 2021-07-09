const express = require("express");
const {
 login,
 create,
  
  
} = require("../../repositories/AdminQuery");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const  ENV = require('../../static') 
const router = express.Router();





 router.post("/login",async (req, res) => {
 
   try {
     const{ email, password} = req.body;
     const admin = await login(email, password);
     delete admin.password;
    
     const payload = {
      admin: {
        id: admin.id
      }
    };

    const token = jwt.sign(
      payload,
      ENV.JWT_KEY
    );
    admin.token = token;
    return res.status(200).json(admin);
    

   }
  
    catch(e) {
      return res.status(e.code).json({
        error: true,
        message: e.message,
      })
    }
 });

router.post("/register", async (req, res) => {
  const { email, password, username } = req.body;
  
  try {   
    console.log(req.body)
    
    const admin = await create(
     
      email,
      password,
      username
     
     
    );
    return res.status(200).json(admin);
  } catch (error) {
    return res.status(error.code).json({
      error: true,
      message: error.message,
    });
  }
});

 

module.exports = router;