import mongoose from "mongoose";

const viewsSchema = new mongoose.Schema(
  {
    siteName: {
      type: String,
      required: true,
      default:"SiteName",
    },
    views: {
      type: Number,
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
      required: true,
      get: (timestamp) => timestamp.getTime(),
      set: (timestamp) => new Date(timestamp),
    },
  },
  { timestamps: true }
);

const viewsCountModel =
  mongoose.models.Views || mongoose.model("Views", viewsSchema);

export default viewsCountModel;
