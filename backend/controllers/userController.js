import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};
// user login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "envailed user" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = createToken(user._id);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invailed password" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// route for registration of user
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // cheaking user already exsit or not
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "User already exists" });
    }

    // validating email format & strong password
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "please enter a valid Email",
      });
    }
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "please enter a valid message",
      });
    }
    // hasing user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });

    const user = await newUser.save();
    const token = createToken(user._id);

    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// admin login
const adminLogin = async (req, res) => {
  try {

    const {email,password} = req.body
    
    if( email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
      const token = jwt.sign(email+password,process.env.JWT_SECRET);
      res.json({success:true,token})
    }else{
      res.json({success:false,message:"Invailed credential"})
    }

  } catch (error) {
    console.log("ERROR");
    
    res.json({success:false,message:"Invailed credential"})
  }
};

export { loginUser, registerUser, adminLogin };
