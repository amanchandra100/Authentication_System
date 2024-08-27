import express from "express";
import {
  forgotPasswordController,
  loginController,
  registerController,
} from "../controllers/authController.js";
import { requireSignIn } from "../middlewares/authMiddleware.js";

import sendEmail from "../services/sendEmail.js";
import otpVarification from "../services/otpVarification.js"

//router object
const router = express.Router();

//routing
//REGISTER
router.post("/register", registerController);

//Otp Send
router.post("/send-otp", sendEmail);

//Otp Verification
router.post("/otp-verification", otpVarification);


//LOGIN || MEATHOD POST
router.post("/login", loginController);

//forget password
router.post("/forgot-password", forgotPasswordController);



//protected User route auth
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});






export default router;
