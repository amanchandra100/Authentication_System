import expressAsyncHandler from "express-async-handler";
import { config } from "dotenv";
import { createTransport } from "nodemailer";
import otpModel from "../models/otpModel.js"
import userModel from "../models/userModel.js";
import generateOTP from "./generateOTP.js";
import {oneMinExpiry} from "../helpers/otpValidate.js"

config();

let transporter = createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_MAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

const sendEmail = expressAsyncHandler(async (req, res) => {

  try {
    const { email } = req.body;
    const userData = await userModel.findOne({email})
    console.log(email);
    if (!userData) {
      return res.status(400).json({
        success: false,
        message: "Email Not Register"
      })
    } 
    // if (userData.verified == 1){
    //   return res.status(400).json({
    //     success: false,
    //     message: userData.email+ "  mail is already verified!"
    //   })
    // }
  
  const g_otp = generateOTP();
  console.log(g_otp)

  const oldOtpData= await otpModel.findOne({user_id: userData._id})

  if (oldOtpData) {
    const sendNextOtp = await oneMinExpiry(oldOtpData.timestamp);
    if (!sendNextOtp) {
      return res.status(400).json({
        success:false,
        message:"Please try after 1 minute"
      })
    }
  }

  const cDate= new Date();

  const Enter_otp = await otpModel.findOneAndUpdate(
    { user_id: userData._id },
    { otp:g_otp, timestamp:new Date(cDate.getTime()) },
    { upsert:true, new: true, setDefaultsOnInsert:true }
  )



  var mailOptions = {
    from: process.env.SMTP_MAIL,
    to: email,
    subject: "OTP for verification ",
    text: `Hii ${userData.name} Your OTP is: ${g_otp}`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      return res.status(400).json({
        success:false,
        message:"Mail not send"
      })
    } else {
      res.status(200).json({
        success: true,
        message:"Email sent successfully!"
      })
      console.log("Email sent successfully!");
    }
  });
  
  } catch (error) {
    console.log(error)
    return res.status(400).json({
      success:false,
      message:"Error in sendemail"
    })
  }
  

  
});

export default sendEmail ;