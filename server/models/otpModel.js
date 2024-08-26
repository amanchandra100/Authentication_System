import mongoose from "mongoose";

const otpSchema = new mongoose.Schema(
  {
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'users'
    },
    otp:{
        type: Number,
        required:true
    },
    timestamp:{
        type:Date,
        default: Date.now,
        required:true,
        get: (timestamp)=> timestamp.getTime(),
        set: (timestamp)=> new Date(timestamp)
    }
  },
  { timestamps: true }
);

export default mongoose.model("Otp", otpSchema);
