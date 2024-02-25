const router = require("express").Router();
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt=require("jsonwebtoken");

//user registration api- model needed and bcrypt needed to encrypt password

router.post("/register", async (req, res) => {
  try {
    //check user already exists or not
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
      return res
        .status(200)
        .send({ message: "User already exists", success: false });
    }

    //hash passwd
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;

    //create new user
    const newUser = new User(req.body);
    await newUser.save();

    res.send({
      message: "User created Successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      data: error,
      success: false,
    });
  }
});

//user login
router.post("/login",async (req, res) => {
     try{
      //check user exists or not
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res
          .status(200)
          .send({ message: "User does not exist", success: false });
      }

      //check password
      const validPassword=await bcrypt.compare(
        req.body.password,
        user.password
      );

      if(!validPassword){
        return res
          .status(200)
          .send({ message: "Invalid Password", success: false });
      }

      const token=jwt.sign(
        {userId:user._id},
        process.env.JWT_SECRET,
        {expiresIn:"1d"}
      );

      res.send({
        message:"User logged in successfully",
        success:true,
        data:token,
      });
    } catch(error){
        res.status(500).send({
            message:error.message,
            data:error,
            success:false,
        });
    }

    });



module.exports = router;
