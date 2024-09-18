import connectDB from "../config/db.js";
import viewCountModel from "../models/viewCountModel.js";

export const viewsCountController = async (req, res) => {

    try {
      
        // await connectDB()
     
        // await  viewCountModel.create({siteName:"A", views: 1 })

        var _id = req.params.Id;

        const oldCount = await viewCountModel.findById(_id).select('views')
        const newCount = oldCount.views + 1
        const updatedCount = await viewCountModel.findByIdAndUpdate(_id, {views: newCount}, {
          new: true,
          upsert: true
          })
        if (updatedCount){
          return  res.status(200).send({
            count:updatedCount.views,
            success: true,
            message: "View Count increasesd",
          });
        }
    } catch (error) {
        console.log(error)
        return res.status(400).json({
          success:false,
          message:"Count not updated"

        })
      }
      

}