import otpModel from "../models/otpModel.js"
import { fiveMinExpiry } from "../helpers/otpValidate.js"
import userModel from "../models/userModel.js"

const verifyOtp = async(req,res) => {
    try {

        const { email, otp } = req.body
        console.log(email)

        const userData = await userModel.findOne({
            email:email
        })

        const user_id = userData._id

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

        const verify = await userModel.findByIdAndUpdate({_id:user_id},{
                $set:{
                    verified:1
                }
            })

        if (verify) {
            return res.status(200).json({
                success: true,
                message: "Your Email is Verified"
            }) 
        }    

    } catch (error) {
        console.log("erroor")
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

export default verifyOtp ;