import userModel from "../models/userModel.js";
import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import JWT from "jsonwebtoken";
import otpModel from "../models/otpModel.js";
import { fiveMinExpiry } from "../helpers/otpValidate.js";

//Register
export const registerController = async (req, res) => {
  try {
    const { firstName, lastName, password, email, contactMode } = req.body;
    //validations
    if (!firstName) {
      return res.send({ message: "First Name is Required" });
    }
    if (!lastName) {
      return res.send({ message: "Last Name is Required" });
    }
    if (!password) {
      return res.send({ message: "Password is Required" });
    }
    if (!email) {
      return res.send({ message: "Email is Required" });
    }
    if (!contactMode) {
      return res.send({ message: "Contact Mode is Required" });
    }

    //check user
    const existingUser = await userModel.findOne({ email });
    //existing user
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "Email Already Register Please Login",
      });
    }
    //register user
    const hashedPassword = await hashPassword(password);
    //save
    const user = await new userModel({
      firstName,
      lastName,
      password: hashedPassword,
      email,
      contactMode
    }).save();
    res.status(201).send({
      success: true,
      message: "User Register Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in registration",
      error,
    });
  }
};



//POST LOGIN
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validatiion
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    //check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not register",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Inavalid Password",
      });
    }
    //token
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "login successful",
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        contactMode:user.contactMode,
        email: user.email,
        verified: user.verified,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};

//forgotPasswordController

export const forgotPasswordController = async (req, res) => {
  try {
    const { email, otp , newPassword } = req.body;
    if (!email) {
      res.status(400).send({ message: "Email is required" });
    }
    if (!otp) {
      res.status(400).send({ message: "otp is required" });
    }
    if (!newPassword) {
      res.status(400).send({ message: "New Password is required" });
    }
    //check
    const user = await userModel.findOne({ email });
    //validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Wrong Email Or Otp",
      });
    }

    
    const user_id = user._id
        

        const otpData = await otpModel.findOne({
            user_id:user_id,
            otp:otp
        })

        if (!otpData) {
            console.log("You Enter Wrong OTP")
            return res.status(400).json({
                success: false,
                message:"You Enter Wrong OTP"
            }) 
        }

        const isotpExpire = await fiveMinExpiry(otpData.timestamp);

        if (isotpExpire) {
            console.log("Your Otp Has been Expired")
            return res.status(400).json({
                success: false,
                message: "Your Otp Has been Expired"
            })
        }
    


    const hashed = await hashPassword(newPassword);
    await userModel.findByIdAndUpdate(user._id, { password: hashed });
    res.status(200).send({
      success: true,
      message: "Password Reset Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};




